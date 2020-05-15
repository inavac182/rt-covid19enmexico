import { intercept } from 'mobx';

export interface Factors {
  date?: string;
  high: number;
  low: number;
  factor: number;
}
