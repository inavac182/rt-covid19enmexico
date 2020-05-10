export interface Summary {
  date: string;
  confirmed: number;
  deaths: number;
  possible?: number;
  negatives?: number;
  recovered?: number;
}

export interface QuickSummary {
  date: string;
  confirmed: number;
  deaths?: number;
}

export interface SummaryCases {
  [key: string]: Summary;
}
