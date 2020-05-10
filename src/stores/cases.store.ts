import { observable, computed, action, remove } from 'mobx';
import { StoreDefaults } from '../utils/storeDefaults';
import { Store } from '../utils/store';
import { firestore } from '../utils/base';
import { CaseState, Summary, ReproductionRateConstantsTypes } from 'src/types';

const docInUse = 'mexico';

export class CasesStore extends Store {
  @observable public states: [CaseState];

  @action
  public fetch(callback?: () => void) {
    if (callback) {
      callback();
    }
  }

  public hydrate(data: StoreDefaults) {
    Object.assign(this, data);
  }
}

CasesStore.DEFAULTS = {
  states: [],
};
