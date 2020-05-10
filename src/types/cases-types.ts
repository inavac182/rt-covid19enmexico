export interface CaseState {
  state: string;
  displayName?: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  possible: number;
}

export interface Cases {
  [key: string]: CaseState;
}
