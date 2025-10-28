import React from 'react'
// Next.js
import Link from 'next/link';
import Image from 'next/image';
// Styles
import styles from './TodayClubsList.module.css';
// Sanity
import { urlFor } from '@/sanity/client';
// Types
import { RunClub } from '@/app/lib/types';
// Icons
import { ArrowUpRight, Clock } from 'lucide-react';


interface TodaysClubsListItemProps {
  club: RunClub;
  formattedDays?: string;
}

function TodaysClubsListItem({ club, formattedDays }: TodaysClubsListItemProps) {
  const slug = club?.slug?.current;

  return (
    <li className={`${styles.todayClubsList__item} fp`}>
        <Link className={styles.todayClubsList__link} href={`/runclubs/${slug}`} aria-label={`View more details about ${club.name} run club`} data-testid="club-link">
            <div className={styles.todayClubsList__label}>
                <ArrowUpRight className={styles.todayClubsList__linkIcon} size={24}/>
            </div>
            {club.logo && (
            <div className={styles.todayClubsList__image}>
                    <Image 
                        src={urlFor(club.logo)
                        .url()}
                        alt={`${club.name} logo`}
                        width={200}
                        height={200}
                        className={styles.todayClubsList__img}
                    />
            </div>
            )}
            <div className={`${styles.todayClubsList__content} fp-col`}>
                <div className={`${styles.todayClubsList__header} fp`}>
                    <h3 className={`${styles.todayClubsList__title} h4`}>{club.name}</h3>
                </div>

                <div className={`${styles.todayClubsList__meta} txt-small`}>
                    <div className={`${styles.todayClubsList__row}`}>
                        <p>{club.city}, {club.location}</p>
                    </div>
                    <div className={`${styles.todayClubsList__row} txt-small`}>
                        <p>Avg. distance: {club.distance}km</p>
                    </div>
                    {club.time &&
                        <div className={styles.todayClubsList__row}>
                            <Clock className={styles.todayClubsList__icon} />
                            {club.time}
                        </div>
                    }
                    <ul className={styles.todayClubsList__row}>
                        {formattedDays?.split(', ').map((day) => (
                            <li key={day} className={styles.todayClubsList__day}>
                                {day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Link>
    </li>
  )
}

export default TodaysClubsListItem