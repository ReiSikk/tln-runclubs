import sanityClient from '@/sanity/client';
import { RunClub } from '../types';

const runClubsQuery = `*[_type == "runClub"] | order(orderRank)`

// Fetch all run clubs from Sanity
export async function getRunClubs(): Promise<RunClub[]> {
  return await sanityClient.fetch<RunClub[]>(runClubsQuery);
}