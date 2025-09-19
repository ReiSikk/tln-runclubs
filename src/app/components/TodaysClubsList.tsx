import { Clock, MapPin, Users } from 'lucide-react';
import styles from '../TodayClubsList.module.css';

interface TodayClub {
  id: string;
  name: string;
  time: string;
  location: string;
  participants: number;
  status: 'starting-soon' | 'in-progress' | 'upcoming';
}

interface TodayClubsListProps {
  clubs: TodayClub[];
}

export function TodayClubsList({ clubs }: TodayClubsListProps) {
  const getStatusClass = (status: TodayClub['status']) => {
    switch (status) {
      case 'starting-soon':
        return styles['todayClubsList__status--startingSoon'];
      case 'in-progress':
        return styles['todayClubsList__status--inProgress'];
      case 'upcoming':
      default:
        return styles['todayClubsList__status--upcoming'];
    }
  };

  return (
    <div className={styles.todayClubsList}>
      {clubs.map((club) => (
        <div key={club.id} className={styles.todayClubsList__item}>
          <div className={styles.todayClubsList__header}>
            <h3 className={styles.todayClubsList__title}>{club.name}</h3>
            <span
              className={`${styles.todayClubsList__status} ${getStatusClass(club.status)}`}
            >
              {club.status === 'starting-soon'
                ? 'Starting Soon'
                : club.status === 'in-progress'
                ? 'In Progress'
                : 'Upcoming'}
            </span>
          </div>

          <div className={styles.todayClubsList__meta}>
            <div className={styles.todayClubsList__row}>
              <Clock className={styles.todayClubsList__icon} />
              {club.time}
            </div>
            <div className={styles.todayClubsList__row}>
              <MapPin className={styles.todayClubsList__icon} />
              {club.location}
            </div>
            <div className={styles.todayClubsList__row}>
              <Users className={styles.todayClubsList__icon} />
              {club.participants} runners joined
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}