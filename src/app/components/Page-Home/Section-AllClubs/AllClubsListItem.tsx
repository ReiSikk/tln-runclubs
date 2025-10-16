import React from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { RunClub } from '@/app/lib/types'
import { urlFor } from "@/sanity/client";


function AllClubsListItem({ club }: { club: RunClub }) {
  const slug = club?.slug?.current;
  const logo = club?.logo;


  if (!club) {
    return (
      <li className={styles.allClubsList__item}>
        <p>No club data available</p>
      </li>
    )
  }

  return (
     <li className={styles.allClubsList__item}>
          {logo ? (
          <Image
            src={urlFor(logo)
              .width(128)
              .height(128)
              .url()}
            alt={`${club.name} logo`}
            width={128}
            height={128}
            className={styles.allClubsList__image}
            priority
          />
        ) : (
             <Image
              unoptimized
              src="https://placehold.co/128x128/svg?text=No+logo+found"
              alt={`${club.name} logo`}
              width={128}
              height={128}
              className={styles.allClubsList__image}
              priority
            />
        )}
        <h4>
          {club.name}
        </h4>
        <Link href={`runclubs/${slug}`} type="button" className={`${styles.allClubsList__btn} btn_small btn-txt-anim`} aria-label="Go to run club page to see more info">
            <span className="txt-main">View</span>
            <span className="txt-hovered">View</span>
        </Link>
    </li>
  )
}

export default AllClubsListItem