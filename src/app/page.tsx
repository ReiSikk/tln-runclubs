import { LucideSun } from "lucide-react";
import ClubListItem from "./components/ClubListItem";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.siteNav}>
        <div className={styles.weatherWidget}>
          {/* Weather widget will go here */}
          <span>
            Tue, 12.09  16C Sunny
          </span>  
          <LucideSun size={16} />
        </div>
      </nav>
      <header className={styles.header}>
        <h1 className={`${styles.siteTitle}`}>Tallinn Run Clubs</h1>
      </header>
      <main className={`${styles.main}`}>
        <section className={`${styles.mainSection} container`}>
          <div className={`${styles.mainSection__main} col-m-12 col-t-8 col-d-8`}>
          <h2 className={`${styles.mainSection__title} h3`}>
            Clubs running in Tallinn today
          </h2>
          <ul className={styles.clubsList}>
            <ClubListItem />
            <ClubListItem />
          </ul>
          </div>
          <aside className={`${styles.mainSection__side} col-m-12 col-t-4 col-d-4`}>
            <h3 className={`${styles.side__title} h3`}>All run clubs</h3>
            <input 
              type="text" 
              name="search" 
              id="search" 
              placeholder="Search clubs..." 
              className={styles.side__input}
            />
            <ul className={styles.allClubsList}>
              <li className={styles.allClubsList__item}>
                icon here
                <span>
                  Example Run Club
                </span>
                <a href="#" type="button" className="btn_small" aria-label="Go to run club page to see more info">View</a>
              </li>
            </ul>
          </aside>
        </section>
        <section className={`${styles.ctaSection} container`}>
            <div className={`${styles.ctaSection__main} col-m-12 col-t-6 col-d-6`}>
              <h4 className={`${styles.ctaSection__title} h2`}>Know of a run club we haven't listed?</h4>
              <p className={`${styles.ctaSection__btn} btn_main`}>Let us know!</p>
            </div>
            <div className={`${styles.ctaSection__side} col-m-12 col-t-6 col-d-6`}>
              {/* //TODO: Remove unpotimized prop */}
              <Image
                unoptimized
                src="https://placehold.co/389x339"
                alt="Join a running club"
                width={389}
                height={339}
                className={styles.ctaSection__image}
              />
            </div>
          </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
