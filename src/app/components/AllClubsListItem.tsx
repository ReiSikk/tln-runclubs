import React from 'react'
import styles from '../page.module.css'
import Image from 'next/image'
import Link from 'next/link'

function AllClubsListItem() {
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
        Buns runs club
        </span>
        {/* //TODO: Link to correct dynamic subpage */}
        <Link href="#" type="button" className={`${styles.allClubsList__btn} txt-btn`} aria-label="Go to run club page to see more info">View</Link>
    </li>
  )
}

export default AllClubsListItem