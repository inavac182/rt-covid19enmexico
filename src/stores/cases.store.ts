import { observable, computed, action, remove } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { firestore } from '../utils/base';
import { StatesData, ArchivedDayCases } from 'src/types';

export class CasesStore extends Store {
  @observable public historical: ArchivedDayCases[];

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

        this.hydrate({
          historical,
        });
      });

    if (callback) {
      callback();
    }
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

CasesStore.DEFAULTS = {
  historical: [],
};
