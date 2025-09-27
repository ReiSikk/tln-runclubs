import styles from './TodayClubsList.module.css';
import TodaysClubsListItem from './TodaysClubsListItem';
import { RunClub } from '../lib/types';
import { convertDaysToAbbs } from "../lib/utils/convertDays";


interface TodayClubsListProps {
  clubs: RunClub[];
}

export function TodayClubsList({ clubs }: TodayClubsListProps) {
  const formattedClubs = clubs.map(club => ({
    ...club,
    days: convertDaysToAbbs(club.days)
  }));

  console.log("Formatted clubs:", formattedClubs);

  return (
    <ul className={styles.todayClubsList}>
      {formattedClubs.map((club) => (
        <TodaysClubsListItem key={club._id} club={club} />
      ))}
    </ul>
  );
}