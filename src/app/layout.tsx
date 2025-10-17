import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import SiteFooter from "./components/SiteFooter";
// Providers
import Providers from "./providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Run Clubs Estonia",
  description: "Find running clubs in Estonia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Run Clubs Estonia</title>
        <meta name="description" content="Find running clubs in Estonia." />
        <meta name="keywords" content="running, runclubs, run clubs, Estonia, Eesti run clubs, Estonia run clubs, Run clubs in Estonia, Run clubs in Tallinn, Run Clubs in Tartu, Tartu, Tallinn, jooksuklubid, jooksmine, jooksijad eestis, Eesti run club, Eesti runners, run groups Estonia, run groups Tallinn, run groups Tartu, running club, running clubs, running clubs in Estonia, running clubs in Tallinn, running clubs in Tartu, running clubs in Pärnu" />
        <meta name="author" content="Rei Sikk" />
        <meta property="og:title" content="Run Clubs Estonia" />
      </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable}`}>
              <Providers>{children}</Providers>
              <SiteFooter />
              <Script
                src="/js/analytics.js"
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                strategy="afterInteractive"
                defer
              />
        </body>
    </html>
  );
}
