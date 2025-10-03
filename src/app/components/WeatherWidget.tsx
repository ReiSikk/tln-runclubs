"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";

interface WeatherData {
  city: string;
  current: {
    windchill_c: number;
    condition: { text: string; icon?: string };
    last_updated?: string;
  };
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className={styles.weatherWidget}>Loading weather data...</div>;

  if (error || !data) return <div className={styles.weatherWidget}>{error}</div>;

  return (
    <div className={styles.weatherWidget}>
      Feels like {data.current.windchill_c}°C | {data.current.condition.text}
      <Image
        src={data.current.condition.icon ? `https:${data.current.condition.icon}` : "https://placehold.co/16x16"}
        alt={data.current.condition.text}
        width={24}
        height={24}
        className={styles.weatherWidget__icon}
      />
    </div>
  );
}