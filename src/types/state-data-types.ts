import { Factors } from './factors-types';

export interface DayData {
  date: 'string';
  confirmed: number;
  deaths: number;
}

export interface StateData {
  state: State;
  data: DayData[];
}

export interface StatesData {
  [key: string]: StateData;
}

export interface State {
  name: string;
  displayName: string;
  id: string;
}

export interface StateR0 {
  state: State;
  factor: Factors[];
}

export interface StateCurrentR0 {
  state: State;
  factor: Factors;
}
