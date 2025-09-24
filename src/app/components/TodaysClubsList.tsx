import styles from './TodayClubsList.module.css';
import TodaysClubsListItem from './TodaysClubsListItem';
import { TodayClub } from '../lib/types';

interface TodayClubsListProps {
  clubs: TodayClub[];
}

export function TodayClubsList({ clubs }: TodayClubsListProps) {
  return (
    <ul className={styles.todayClubsList}>
      {clubs.map((club) => (
        <TodaysClubsListItem key={club.id} club={club} />
      ))}
    </ul>
  );
}