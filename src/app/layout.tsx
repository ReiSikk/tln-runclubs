import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Providers from "./providers";
import SiteFooter from "./components/SiteFooter";

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
  title: "Tallinn Run Clubs",
  description: "Find running clubs in Tallinn, Estonia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Tallinn Run Clubs</title>
        <meta name="description" content="Find running clubs in Tallinn, Estonia" />
        <meta name="keywords" content="running, clubs, Tallinn, Estonia, fitness, health, community" />
        <meta name="author" content="Rei Sikk" />
        <meta property="og:title" content="Tallinn Run Clubs" />
      </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable}`}>
          <Providers>{children}</Providers>
          <SiteFooter />
        </body>
    </html>
  );
}
