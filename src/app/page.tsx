import AllClubsListItem from "./components/AllClubsListItem";
import ClubListItem from "./components/ClubListItem";
import CtaSection from "./components/CtaSection";
import SearchBar from "./components/SearchBar";
import { TodayClubsList } from "./components/TodaysClubsList";
import WeatherWidget from "./components/WeatherWidget";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

  return (
    <div className={`${styles.page}`}>
      <header className={`${styles.header} container`}>
        <h1 className={`${styles.siteTitle} italic uppercase`}>Tln Run Clubs</h1>
        <WeatherWidget />
      </header>
      <main className={`${styles.main} container`}>
        <section className={`${styles.mainSection} fp`}>
          <div className={`${styles.mainSection__main} col-m-12 col-t-6 col-d-4`}>
          <h2 className={`${styles.mainSection__title} h3`}>
            Clubs running in Tallinn today
          </h2>
          <div className={styles.clubsList}>
            <TodayClubsList clubs={[
              {
                id: '1',
                name: 'Morning Joggers',
                time: '6:30 AM - 7:30 AM',
                location: 'Kadriorg Park',
                participants: 15,
                status: 'starting-soon',
                days: ['Mon', 'Wed', 'Fri'],
              },
              {
                id: '2',
                name: 'City Runners',
                time: '7:00 AM - 8:00 AM',
                location: 'Freedom Square',
                participants: 20,
                status: 'in-progress',
                days: ['Tue', 'Thu'],
              },
            ]} />
          </div>
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
        <CtaSection />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
