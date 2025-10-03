import { SanityImageSource } from "@sanity/image-url/lib/types/types";
  
export interface RunClub {
  _id: string;
  name: string;
  logo?: SanityImageSource | '';
  time: string;
  city: string;
  location: string;
  address: string;
  description: string;
  participants: number;
  distanceRange: string;
  distanceLead: string;
  days: string[];
  daysLead: string;
  slug?: { current: string };
  status: 'starting-soon' | 'in-progress' | 'upcoming';
  facebook?: string;
  instagram?: string;
  strava?: string;
  website?: string;
}

export type RunClubs = RunClub[];