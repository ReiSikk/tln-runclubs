// Components
import CtaSection from "./components/CtaSection";
import { TodayClubsList } from "./components/TodaysClubsList";
import WeatherWidget from "./components/WeatherWidget";
// Sanity
import sanityClient from "../sanity/client";
// Types
import { RunClub } from "./lib/types";
// Styles
import styles from "./page.module.css";
// TanStack Query
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import HomeMainAside from "./components/MainSectionAside";
import { HeroSection } from "./components/HeroSection";

const postsQuery = `*[_type == "runClub"] | order(orderRank)`
const options = { next: { revalidate: 30 } };

// Fetch all run clubs from Sanity
export async function getRunClubs(): Promise<RunClub[]> {
  return await sanityClient.fetch<RunClub[]>(postsQuery, {}, options);
}

export default async function Home() {
  const queryClient = new QueryClient()

  // Prefetch data on server for instant loading
  await queryClient.prefetchQuery({
    queryKey: ['runClubs'],
    queryFn: getRunClubs,
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <div className={`${styles.page}`}>
      <header className={`${styles.header} container`}>
        <h1 className={`${styles.siteTitle} italic uppercase`}>Tln Run Clubs</h1>
        <WeatherWidget />
      </header>
      <main className={`${styles.main} container`}>
        <HeroSection />
        <section className={`${styles.mainSection} fp`}>
          <div className={`${styles.mainSection__main} col-m-12 col-t-6 col-d-4`}>
          <h2 className={`${styles.mainSection__title} h3`}>
            Clubs running in Tallinn today
          </h2>
          <div className={styles.clubsList}>
            <TodayClubsList />
          </div>
          </div>
          <HomeMainAside />
        </section>
        <CtaSection />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </HydrationBoundary>
  );
}
