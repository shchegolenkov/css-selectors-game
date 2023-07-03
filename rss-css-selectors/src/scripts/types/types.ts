export interface Level {
  task: string;
  selectors: string[];
  markup: string[];
  table: string[][];
}

export type Listener = (...args: string[]) => void;
