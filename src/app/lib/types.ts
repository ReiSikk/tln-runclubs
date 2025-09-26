export interface RunClub {
  _id: string;
  name: string;
  time: string;
  location: string;
  participants: number;
  days: string[];
  status: 'starting-soon' | 'in-progress' | 'upcoming';
}

export type RunClubs = RunClub[];