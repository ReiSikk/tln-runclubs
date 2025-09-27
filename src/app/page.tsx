import CtaSection from "./components/CtaSection";
import SearchBar from "./components/SearchBar";
import AllClubsList from "./components/AllClubsList";
import { TodayClubsList } from "./components/TodaysClubsList";
import WeatherWidget from "./components/WeatherWidget";
import { RunClub } from "./lib/types";
import sanityClient from "../sanity/client";
import styles from "./page.module.css";

const postsQuery = `*[_type == "runClub"] | order(orderRank)`

const options = { next: { revalidate: 30 } };

export default async function Home() {
    const allRunClubs = await sanityClient.fetch<RunClub[]>(postsQuery, {}, options);

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
            <TodayClubsList clubs={allRunClubs} />
          </div>
          </div>
          <aside className={`${styles.mainSection__side} col-m-12 col-t-6 col-d-8`}>
            <h3 className={`${styles.side__title} h3`}>All run clubs</h3>
            <SearchBar />
            <AllClubsList clubs={allRunClubs} />
          </aside>
        </section>
        <CtaSection />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
