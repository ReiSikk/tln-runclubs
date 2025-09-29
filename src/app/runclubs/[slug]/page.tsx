import React from 'react'
import sanityClient  from '@/sanity/client'
import { RunClub } from '@/app/lib/types';
import styles from './page.module.css'
import CtaSection from '@/app/components/CtaSection';


async function getCurrentRunClub(slug: string): Promise<RunClub | null> {
  const query = `*[_type == "runClub" && slug.current == $slug][0]`;
  return await sanityClient.fetch(query, { slug }, { next: { revalidate: 30 } });
}

async function SingleRunClubPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const club = await getCurrentRunClub(slug);

  if (!club) {
    return <div>Club not found</div>;
  }

  return (
    <>
      <header className={`${styles.pageHeader} container`}>
        <h1 className={styles.pageHeader__title}>{club.name}</h1>
        <p className={styles.pageHeader__description}>{club.description}</p>
        <ul className={`${styles.pageHeader__cards} list-flex`}>
          <li className={styles.pageHeader__card}>
            <span className={`${styles.label} uppercase txt-label`}>Schedule</span>
            <h2 className={`${styles.cardTitle} h5`}>{club.days?.join(', ')}</h2>
          </li>
          <li className={styles.pageHeader__card}>
            <span className={`${styles.label} uppercase txt-label`}>Meeting Point</span>
            <h2 className={`${styles.cardTitle}`}>{club.location}</h2>
            <p>{club.address}</p>
          </li>
          <li className={styles.pageHeader__card}>
            <span className={`${styles.label} uppercase txt-label`}>Distance</span>
            <h2 className={`${styles.cardTitle}`}>{club.distanceRange}</h2>
          </li>
        </ul>
        <h3 className={styles.pageHeader__subtitle}>Visit our socials to stay in the loop for events!</h3>
        <ul className={`${styles.pageHeader__socials} list-flex`}>
          <li>
            <a href="#" className="txt-btn btn-main" aria-label="Visit our Facebook page">Facebook</a>
          </li>
          <li>
            <a href="#" className="txt-btn btn-main" aria-label="Visit our Instagram page">Instagram</a>
          </li>
        </ul>
      </header>
      <main className={`${styles.pageMain} container`}>
        <CtaSection variant="white-bg"/>
      </main>
    </>
  )
}

export default SingleRunClubPage