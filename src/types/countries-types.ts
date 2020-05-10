import { QuickSummary } from './summary-types';

export interface Country {
  name: string;
  displayName: string;
  selected?: boolean;
}

export interface CountryCases {
  country: Country;
  cases: QuickSummary[];
}

export interface GraphControls {
  label: string;
  selected: boolean;
  func: (cases: QuickSummary[]) => QuickSummary[];
}

export interface CountryData {
  Country: string;
  Province: string;
  Lat: number;
  Loing: number;
  Date: string;
  Cases: number;
  Status: string;
}

export interface CountryResponse {
  [key: string]: CountryData;
}
