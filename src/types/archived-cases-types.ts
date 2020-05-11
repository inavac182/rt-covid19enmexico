export interface ArchivedStateData {
  state: string;
  displayName?: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  possible: number;
}

export interface ArchivedCases {
  [key: string]: ArchivedStateData;
}

export interface ArchivedDayCases {
  date: string;
  data: ArchivedStateData[];
}
