"use client";

import styles from './TodayClubsList.module.css';
import TodaysClubsListItem from './TodayClubsListItem';
import { convertDaysToAbbs } from "@/app/lib/utils/convertDays";
import { RunClub } from '@/app/lib/types';

interface TodayClubsListProps {
  clubs: RunClub[];
  isLoading: boolean;
  isError: boolean;
}

export type FormattedRunClub = Omit<RunClub, 'days'> & {
  days: string;
};

export function TodayClubsList({ clubs, isLoading, isError  }: TodayClubsListProps) {

  if (isLoading) {
    return <div className={`${styles.todayClubsList} loading`}>Loading clubs...</div>
  }
  
  if (isError) {
    return <div className={`${styles.todayClubsList} error`}>Error loading clubs</div>
  }

  const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  
  // Filter clubs that run today
  const todaysClubs = clubs.filter(club => 
    club.days && club.days.some(day => 
      day.toLowerCase().includes(today) ||
      day.toLowerCase().includes(today.substring(0, 3)) // Check for abbreviations too
    )
  );

  // Format the clubs
const formattedClubs: FormattedRunClub[] = todaysClubs.map((club: RunClub): FormattedRunClub => ({
  ...club,
  days: convertDaysToAbbs(club.days).join(', ')
}));

  if (formattedClubs.length === 0) {
    return (
      <div className={`${styles.todayClubsList} ${styles.no_clubs}`}>
        <div className={styles.todayClubsList__item}>
          <p className='txt-body'>
            {`No clubs running in your selected city today matching your search term.`}
            <br />
            {`Try selecting "All Cities", clearing your search term, or check back another day!`}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className={styles.todayClubsList}>
      {todaysClubs.map((club) => (
        <TodaysClubsListItem key={club._id} club={club}  formattedDays={convertDaysToAbbs(club.days).join(', ')}/>
      ))}
    </ul>
  );
}