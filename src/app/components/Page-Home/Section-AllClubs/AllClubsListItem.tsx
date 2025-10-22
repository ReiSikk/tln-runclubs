import React from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { RunClub } from '@/app/lib/types'
import { urlFor } from "@/sanity/client";
import { LucideArrowUpRight } from 'lucide-react'


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
        <Link href={`runclubs/${slug}`} className={`${styles.allClubsList__link} fp-col`}>
          {logo ? (
            <div className={styles.allClubsList__imageWrapper}>
              <Image
                src={urlFor(logo)
                  .url()}
                alt={`${club.name} logo`}
                width={880}
                height={880}
                className={styles.allClubsList__image}
                priority
              />
            </div>

        ) : (
            <div className={styles.allClubsList__imageWrapper}>
              <Image
                unoptimized
                src="https://placehold.co/128x128/svg?text=No+logo+found"
                alt={`${club.name} logo`}
                width={128}
                height={128}
                className={styles.allClubsList__image}
                priority
              />
            </div>
        )}
        <div className={`${styles.allClubsList__info} fp-col`}>
          <h4 className=''>
            {club.name}
          </h4>
            <div role="button" className={`${styles.allClubsList__btn} btn_small btn-txt-anim`} aria-label="Go to run club page to see more info">
              <span className="txt-main">View <LucideArrowUpRight width={24} height={24} /></span>
              <span className="txt-hovered">View <LucideArrowUpRight width={24} height={24} /></span>
            </div>
        </div>
      </Link>
    </li>
  )
}

export default AllClubsListItem