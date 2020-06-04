import { observable, action, computed } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { firestore } from '../utils/base';
import { ArchivedDayCases, HistoricalTotals, StateData, DayData, State, StateR0, StateCurrentR0 } from 'src/types';
import { Factors } from 'src/types/factors-types';

export class CasesStore extends Store {
  @observable public historical: ArchivedDayCases[];
  @observable public states: StateData[];
  @observable public nationalTotals: DayData[];
  @observable public statesR0: StateR0[];
  @observable public nationalR0: Factors[];
  @observable public currentFactors: StateCurrentR0[];
  @observable public loading: boolean;
  private averageDaysForRT: number;

  private daysToRemoveConfirmed: number;
  private factorInterval: number;

  @action
  public fetch(callback?: () => void) {
    const { historical } = this;

    firestore
      .collection('archived')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return;
        }

        snapshot.forEach(doc => {
          const data = doc.data();
          const dayData = {
            date: doc.id,
            data: data.states,
          };

          historical.push(dayData);
        });

        const states: StateData[] = this.getStatesFromHistorical(historical);
        const nationalTotals: DayData[] = this.generateTotals(historical);
        const nationalR0 = this.generateR0(nationalTotals);

        states.map(stateData => {
          stateData.data = this.getTotalsForState(historical, stateData.state);
        });
        const statesR0 = this.generateR0ForStates(states);
        const currentFactors = this.getCurrentStatesR0(statesR0);

        this.hydrate({
          historical,
          states,
          nationalTotals,
          nationalR0,
          statesR0,
          currentFactors,
          loading: false,
        });
      });

    if (callback) {
      callback();
    }
  }

  private getTotalsForState(historical: ArchivedDayCases[], state: State) {
    const stateHistoryData = [];

    historical.map(cases => {
      const stateCases = cases.data.filter(dayCase => dayCase.state === state.name);
      stateHistoryData.push({
        confirmed: stateCases[0].confirmed,
        deaths: stateCases[0].deaths,
        date: cases.date,
      });
    });

    return stateHistoryData;
  }

  private getStatesFromHistorical(historical: ArchivedDayCases[]) {
    const states = [];
    const { data } = historical[0];

    data.map(stateData => {
      const state = {
        name: stateData.state,
        displayName: stateData.displayName,
        id: stateData.id,
      };

      states.push({
        state,
        data: [],
      });
    });

    return states;
  }

  private generateTotals(historical: ArchivedDayCases[]) {
    const totals = [];
    historical.map(dayCases => {
      let confirmed = 0;
      let deaths = 0;

      dayCases.data.map(cases => {
        confirmed += cases.confirmed;
        deaths += cases.deaths;
      });

      totals.push({
        date: dayCases.date,
        confirmed,
        deaths,
      });
    });

    return totals;
  }

  private generateR0ForStates(states: StateData[]) {
    const statesR0: StateR0[] = [];

    states.map(state => {
      const factors = this.generateR0(state.data);

      statesR0.push({
        state: state.state,
        factor: factors,
      });
    });

    return statesR0;
  }

  private getCurrentStatesR0(states: StateR0[], index?: number) {
    const currentStatesR0 = [];
    const daysBack = index ? index : 1;

    states.map(state => {
      const currentFactor = state.factor[state.factor.length - daysBack];
      currentStatesR0.push({
        state: state.state,
        factor: currentFactor,
      });
    });

    return currentStatesR0;
  }

  @action
  public updateCurrentStatesR0(index: number) {
    const { statesR0 } = this;

    if (!statesR0 || statesR0.length === 0) {
      return;
    }

    const currentFactors = this.getCurrentStatesR0(statesR0, index);

    this.hydrate({
      currentFactors,
    });
  }

  private generateR0(data: DayData[]) {
    const factors: Factors[] = [];
    const newCases = [];
    const activeCases = [];
    const removedCases = [];
    const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });

    data.map((dayData, index) => {
      let inFactor = 0;
      let newCasesForTheDay = 0;
      let casesToRemove = 0;
      let activeCasesForTheDay = 0;
      let previousInfectedCases = 0;
      let newInFactor = 0;

      if (index === 0) {
        inFactor = dayData.confirmed;
        newCasesForTheDay = dayData.confirmed;
        activeCasesForTheDay = dayData.confirmed;
        newInFactor = dayData.confirmed;
      } else {
        newCasesForTheDay = dayData.confirmed - data[index - 1].confirmed;
        previousInfectedCases = activeCases[index - 1];

        if (index > this.daysToRemoveConfirmed) {
          casesToRemove = newCases[index - this.daysToRemoveConfirmed];
        }

        const numberOfDaysBackForYesterday =
          newCases.length >= this.averageDaysForRT ? this.averageDaysForRT : newCases.length;
        const numberOfDaysBackForToday =
          newCases.length >= this.averageDaysForRT ? this.averageDaysForRT - 1 : newCases.length;
        let weekCasesForYesterday = 0;
        let weekCasesForToday = 0;

        for (let i = 1; i <= numberOfDaysBackForYesterday; i++) {
          weekCasesForYesterday += newCases[index - i];
        }

        for (let i = 1; i <= numberOfDaysBackForToday; i++) {
          weekCasesForToday += newCases[index - i];
        }

        weekCasesForToday += newCasesForTheDay;

        const weekAverageCasesToday = weekCasesForToday / numberOfDaysBackForToday;
        const weekAverageCasesYesterday = weekCasesForYesterday / numberOfDaysBackForYesterday;

        activeCasesForTheDay = previousInfectedCases + newCasesForTheDay - casesToRemove;
        inFactor = previousInfectedCases ? activeCasesForTheDay / previousInfectedCases : 0;
        newInFactor = weekAverageCasesToday / weekAverageCasesYesterday;
      }

      newCases.push(newCasesForTheDay);
      removedCases.push(casesToRemove);
      activeCases.push(activeCasesForTheDay);

      const cleanedDate = dayData.date.replace('cases-', '');
      const date = new Date(cleanedDate);
      const locDate = dateTimeFormat.formatToParts(date);
      const factor = parseFloat(newInFactor.toFixed(2));
      const highFactor = parseFloat((newInFactor + this.factorInterval).toFixed(2));
      const lowFactor = parseFloat((newInFactor - this.factorInterval).toFixed(2));

      factors.push({
        date: `${locDate[0].value} ${locDate[2].value}`,
        factor: factor,
        low: lowFactor,
        high: highFactor,
      });
    });

    return factors;
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

CasesStore.DEFAULTS = {
  historical: [],
  states: [],
  nationalTotals: [],
  daysToRemoveConfirmed: 14,
  factorInterval: 0.1,
  currentFactors: [],
  loading: true,
  averageDaysForRT: 7,
};
