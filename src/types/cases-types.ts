export interface CaseState {
  state: string;
  displayName?: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  possible: number;
  extraInfo?: [ExtraInfoContainer];
}

export interface ExtraInfoContainer {
  name: string;
  catalogType?: string;
  catalogValue?: string;
  catalogIndex?: number;
  info: [ExtraSummaryInfo];
}

export interface ExtraSummaryInfo {
  catalogType?: string;
  catalogValue?: string;
  catalogIndex?: number;
  name: string;
  active: number;
  deaths: number;
  recovered: number;
}

export interface Cases {
  [key: string]: CaseState;
}

export interface ReproductionRateConstantsTypes {
  s: number;
  i: number;
  r: number;
  d: number;
}
