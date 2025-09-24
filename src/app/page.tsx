import AllClubsListItem from "./components/AllClubsListItem";
import ClubListItem from "./components/ClubListItem";
import SearchBar from "./components/SearchBar";
import { TodayClubsList } from "./components/TodaysClubsList";
import WeatherWidget from "./components/WeatherWidget";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

  return (
    <div className={styles.page}>
      <nav className={styles.siteNav}>
        <WeatherWidget />
      </nav>
      <header className={styles.header}>
        <h1 className={`${styles.siteTitle} italic uppercase`}>Tln Run Clubs</h1>
      </header>
      <main className={`${styles.main}`}>
        <section className={`${styles.mainSection} container`}>
          <div className={`${styles.mainSection__main} col-m-12 col-t-6 col-d-4`}>
          <h2 className={`${styles.mainSection__title} h3`}>
            Clubs running in Tallinn today
          </h2>
          <ul className={styles.clubsList}>
            {/* <ClubListItem /> */}
            {/* <ClubListItem /> */}
            <TodayClubsList clubs={[
              {
                id: '1',
                name: 'Morning Joggers',
                time: '6:30 AM - 7:30 AM',
                location: 'Kadriorg Park',
                participants: 15,
                status: 'starting-soon',
              },
              {
                id: '2',
                name: 'City Runners',
                time: '7:00 AM - 8:00 AM',
                location: 'Freedom Square',
                participants: 20,
                status: 'in-progress',
              },
            ]} />
          </ul>
          </div>
          <aside className={`${styles.mainSection__side} col-m-12 col-t-6 col-d-8`}>
            <h3 className={`${styles.side__title} h3`}>All run clubs</h3>
            <SearchBar />
            <ul className={`${styles.allClubsList} list-block`}>
              <AllClubsListItem />
              <AllClubsListItem />
              <AllClubsListItem />
              <AllClubsListItem />
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
