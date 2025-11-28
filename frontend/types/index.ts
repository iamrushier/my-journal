export type Sentiment = "HAPPY" | "SAD" | "ANGRY" | "ANXIOUS";

export interface JournalEntry {
  id?: string;
  title: string;
  content?: string;
  date?: string;
  sentiment?: Sentiment;
}

export interface User {
  id?: string;
  userName: string;
  email?: string;
  sentimentAnalysis?: boolean;
  password: string;
  journalEntries?: JournalEntry[];
  roles?: string[];
}
