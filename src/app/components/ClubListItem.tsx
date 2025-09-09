import React from 'react'
import Image from 'next/image'
import styles from '../page.module.css'

function ClubListItem() {
  return (
      <li className={styles.clubsList__item}>
        <div className={styles.item__inner}>
            {/* //TODO: Remove unoptimized prop */}
            <Image
                unoptimized
                src="https://placehold.co/100x100"
                alt="Run Club 1"
                width={100}
                height={100}
                className={styles.item__image}
            />
            <div className={styles.item__details}>
                <h3 className={styles.item__title}>Example Run Club</h3>
                <p className={styles.item__area}>Kesklinn</p>
                <p className={styles.item__days}>Every Monday at 6 PM</p>
                {/* <a href="#" className="btn_small" aria-label="Link to run club's details page ">More info</a> */}
            </div>
        </div>
    </li>
  )
}

export default ClubListItem