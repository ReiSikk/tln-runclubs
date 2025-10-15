// Components
import MainSection from "./components/Page-Home/MainSection";
import HeroSection  from "./components/Page-Home/HeroSection";
import CtaSection from "./components/Page-Home/CtaSection";
import WeatherWidget from "./components/Navbar/WeatherWidget";
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
        <h1 className={`${styles.siteTitle} italic uppercase`}>Run Clubs Est</h1>
        <WeatherWidget />
      </header>
      <main className={`${styles.main} container`}>
        <HeroSection />
        <MainSection />
        <CtaSection />
      </main>
    </div>
    </HydrationBoundary>
  );
}
