export interface RunClub {
  _id: string;
  name: string;
  time: string;
  location: string;
  address: string;
  description: string;
  participants: number;
  distanceRange: string;
  days: string[];
  slug?: { current: string };
  status: 'starting-soon' | 'in-progress' | 'upcoming';
  facebook?: string;
  instagram?: string;
  strava?: string;
  website?: string;
}

export type RunClubs = RunClub[];