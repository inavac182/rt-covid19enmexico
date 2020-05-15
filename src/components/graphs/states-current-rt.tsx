import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Chart from 'react-google-charts';

import { CasesStore } from 'src/stores';
import { CheckboxButton } from '../common';

interface StatesCurrentRtProps {
  casesStore?: CasesStore;
}

export const StatesCurrentRt = inject('casesStore')(
  observer((props: StatesCurrentRtProps) => {
    const [daysBack, setDaysBack] = useState(1);
    const { casesStore } = props;
    const { currentFactors, loading } = casesStore;
    const graphData = [];
    const orderedStates = currentFactors.slice().sort((prev, next) => {
      return prev.factor.factor > next.factor.factor ? 1 : -1;
    });
    graphData.push(['Estado', '', { role: 'interval' }, { role: 'interval' }, { role: 'style' }]);

    orderedStates.map(current => {
      graphData.push([
        current.state.name,
        current.factor.factor,
        current.factor.high,
        current.factor.low,
        current.factor.factor < 1 ? '#8bc34a' : '#e06c75',
      ]);
    });

    useEffect(() => {
      casesStore.updateCurrentStatesR0(daysBack);
    }, [daysBack]);

    const changeDateForGraph = (days: number, checked: string) => {
      setDaysBack(days);
    };

    return (
      <section className="states-current-rt">
        <h2 className="center-content margin-top-three">Taza de reproducción del COVID-19 por estado</h2>
        {loading && <p>Cargando...</p>}
        {!loading && (
          <>
            <div className="graph-controls center-content margin-top-two">
              <CheckboxButton id={1} text="Hoy" selected={daysBack === 1} toggleButton={changeDateForGraph} />
              <CheckboxButton id={7} text="Hace 1 semana" selected={daysBack === 7} toggleButton={changeDateForGraph} />
              <CheckboxButton
                id={15}
                text="Hace 2 semanas"
                selected={daysBack === 15}
                toggleButton={changeDateForGraph}
              />
              <CheckboxButton id={30} text="Hace 1 mes" selected={daysBack === 30} toggleButton={changeDateForGraph} />
            </div>
            <Chart
              width={'100%'}
              height={'500px'}
              chartType="ScatterChart"
              loader={<div className="chart-box center animation animatedBox margin-top-one"></div>}
              data={graphData}
              options={{
                chartArea: { width: '80%', height: '60%' },
                hAxis: { title: 'Estados', textStyle: { color: '#abb2bf' } },
                vAxis: {
                  title: 'R0',
                  baseline: 1,
                  minValue: 0,
                  maxValue: 2,
                  textStyle: { color: '#abb2bf' },
                  baselineColor: 'yellow',
                },
                pointSize: 10,
                intervals: {
                  style: 'area',
                  fillOpacity: 0.3,
                  color: '#c678dd',
                },
                crosshair: { orientation: 'both', trigger: 'both' },
                backgroundColor: '#21252b',
                curveType: 'function',
                legend: 'none',
                animation: {
                  duration: 200,
                  easing: 'inAndOut',
                },
              }}
            />
          </>
        )}
      </section>
    );
  })
);
