export interface TodayClub {
  id: string;
  name: string;
  time: string;
  location: string;
  participants: number;
  days: string[];
  status: 'starting-soon' | 'in-progress' | 'upcoming';
}

export type TodayClubs = TodayClub[];