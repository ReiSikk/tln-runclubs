import React from 'react'
import { ArrowUpRight, Calendar, Clock, MapPin } from 'lucide-react';
import styles from './TodayClubsList.module.css';
import { RunClub } from '@/app/lib/types';
import Link from 'next/link';
import { convertDaysToAbbs } from '@/app/lib/utils/convertDays';


interface TodaysClubsListItemProps {
  club: RunClub;
  formattedDays?: string;
}

function TodaysClubsListItem({ club, formattedDays }: TodaysClubsListItemProps) {
  const slug = club?.slug?.current;
  const displayDays = formattedDays || convertDaysToAbbs(club.days).join(', ');

  // const getStatusClass = (status: RunClub['status']) => {
  //   switch (status) {
  //     case 'starting-soon':
  //       return styles['todayClubsList__status--startingSoon'];
  //     case 'in-progress':
  //       return styles['todayClubsList__status--inProgress'];
  //     case 'upcoming':
  //     default:
  //       return styles['todayClubsList__status--upcoming'];
  //   }
  // };


  return (
    <li className={styles.todayClubsList__item}>
        <div className={`${styles.todayClubsList__header} fp`}>
            <h3 className={`${styles.todayClubsList__title} h4`}>{club.name}</h3>
            {/* <span
                className={`${styles.todayClubsList__status} ${getStatusClass(club.status)}`}
            >
                {club.status === 'starting-soon'
                ? 'Starting Soon'
                : club.status === 'in-progress'
                ? 'In Progress'
                : 'Upcoming'}
            </span> */}
        </div>

        <div className={`${styles.todayClubsList__meta} txt-small`}>
            <div className={`${styles.todayClubsList__row} h6`}>
                <MapPin className={styles.todayClubsList__icon} />
                {club.location}
            </div>
            {club.time &&
                <div className={styles.todayClubsList__row}>
                    <Clock className={styles.todayClubsList__icon} />
                    {club.time}
                </div>
            }
            <div className={styles.todayClubsList__row}>
                <Calendar className={styles.todayClubsList__icon} />
                {displayDays}
            </div>
        </div>
          <Link className={styles.todayClubsList__link} href={`/runclubs/${slug}`} aria-label={`View more details about ${club.name} run club`}>
            <div className={styles.todayClubsList__linkContent}>
                <span>View</span>
                <ArrowUpRight className={styles.todayClubsList__linkIcon} size={24}/>
            </div>
        </Link>
    </li>
  )
}

export default TodaysClubsListItem