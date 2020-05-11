export interface DayData {
  day: 'string';
  confirmed: number;
  recovered: number;
  negatives: number;
  possible: number;
  deaths: number;
}

export interface StateData {
  state: string;
  data: DayData[];
}

export interface StatesData {
  [key: string]: StateData;
}
