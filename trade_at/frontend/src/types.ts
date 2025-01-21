export interface Indicator {
  type: string; // Indicator type (e.g., "RSI", "MACD")
  data: number[]; // Array of calculated values for the indicator
}

export interface DataPoint {
  date: string; // ISO date string
  close?: number; // Add other relevant fields, such as open, high, low, etc.
  [key: string]: any; // Allow additional fields
}
