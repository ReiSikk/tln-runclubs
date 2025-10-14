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

export function TodayClubsList({ clubs, isLoading, isError  }: TodayClubsListProps) {

  if (isLoading) {
    return <div className={`${styles.todayClubsList} loading`}>Loading clubs...</div>
  }
  
  if (isError) {
    return <div className={`${styles.todayClubsList} error`}>Error loading clubs</div>
  }

  // Get today's day name
  const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  
  // Filter clubs that run today
  const todaysClubs = clubs.filter(club => 
    club.days && club.days.some(day => 
      day.toLowerCase().includes(today) ||
      day.toLowerCase().includes(today.substring(0, 3)) // Check for abbreviations too
    )
  );

  // Format the clubs
  const formattedClubs = todaysClubs.map((club: RunClub) => ({
    ...club,
    days: convertDaysToAbbs(club.days).join(', ')
  }));

  if (formattedClubs.length === 0) {
    return (
      <div className={`${styles.todayClubsList} ${styles.no_clubs}`}>
        <div className={styles.todayClubsList__item}>
          <p className='txt-body'>
            {`No clubs running in your selected city today.`}
            <br />
            {`Try selecting "All Cities" or check back another day!`}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className={styles.todayClubsList}>
      {todaysClubs.map((club) => (
        <TodaysClubsListItem key={club._id} club={club} />
      ))}
    </ul>
  );
}