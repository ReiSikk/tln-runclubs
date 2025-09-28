"use client";

import styles from './TodayClubsList.module.css';
import TodaysClubsListItem from './TodaysClubsListItem';
import { convertDaysToAbbs } from "../lib/utils/convertDays";
import  getRunClubs  from '../lib/hooks/useRunClubs';

export function TodayClubsList() {
  const { data: clubs = [], isLoading, isError, isSuccess } = getRunClubs();

  if (isLoading) {
    return <div className={`${styles.todayClubsList} loading`}>Loading clubs...</div>
  }
  
  if (isError) {
    return <div className={`${styles.todayClubsList} error`}>Error loading clubs</div>
  }

  // format the fetched data 
  const formattedClubs = clubs.map(club => ({
    ...club,
    days: convertDaysToAbbs(club.days)
  }));

  if (!isSuccess || formattedClubs.length === 0) {
    return <div className={`${styles.todayClubsList} no-clubs`}>No clubs available</div>
  }

  return (
    <ul className={styles.todayClubsList}>
      {formattedClubs.map((club) => (
        <TodaysClubsListItem key={club._id} club={club} />
      ))}
    </ul>
  );
}