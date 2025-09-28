'use client';

import { useQuery } from '@tanstack/react-query';
import { RunClub } from '../types';
import sanityClient from '@/sanity/client';

async function getRunClubs(): Promise<RunClub[]> {
  return await sanityClient.fetch(`*[_type == "runClub"] | order(orderRank)`);
}

export default function useRunClubs() {
  return useQuery({
    queryKey: ['runClubs'],
    queryFn: getRunClubs,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
}