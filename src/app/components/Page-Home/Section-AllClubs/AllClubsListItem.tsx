import React from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { RunClub } from '@/app/lib/types'

function AllClubsListItem({ club }: { club: RunClub }) {
  const slug = club?.slug?.current;

  if (!club) {
    return (
      <li className={styles.allClubsList__item}>
        <p>No club data available</p>
      </li>
    )
  }

  return (
     <li className={styles.allClubsList__item}>
        <Image
          src="https://placehold.co/64x64"
          alt="Buns runs club"
          width={64}
          height={64}
          unoptimized
          className={styles.allClubsList__image}
        />
        <span>
          {club.name}
        </span>
        <Link href={`runclubs/${slug}`} type="button" className={`${styles.allClubsList__btn} txt-btn`} aria-label="Go to run club page to see more info">View</Link>
    </li>
  )
}

export default AllClubsListItem