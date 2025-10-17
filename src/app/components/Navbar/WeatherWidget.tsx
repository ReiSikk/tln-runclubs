"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from '@/app/page.module.css'

interface WeatherData {
  city: string;
  current: {
    windchill_c: number;
    condition: { text: string; icon?: string };
    last_updated?: string;
  };
}


const reverseGeocode = async (lat: number, lon: number) => {

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "RunClubs/1.0 (https://runclubs.ee)" // required by Nominatim usage policy
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to reverse geocode location:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    if (!data || !data.address) {
      console.warn("No address data found:", data);
      return null;
    }

    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county ||
      null
    );
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return null;
  }
};


const getUserLocation = async () => {
  if (!("geolocation" in navigator)) {
    alert("Geolocation is not available. Please enable location services in your browser settings.");
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const city = await reverseGeocode(position.coords.latitude, position.coords.longitude);
    return city;
  } catch (error) {
    console.error("Geolocation error:", error);
    return null;
  }
};

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    async function getLocationAndFetchWeather() {
      try {
        // Get user location
        const city = await getUserLocation();
        if (city) {
          setUserCity(city);
        }
        
        // Fetch weather data + city
        const weatherCity = city || "Tallinn";
        const res = await fetch(`/api/weather?city=${encodeURIComponent(weatherCity)}`);
        
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }

    getLocationAndFetchWeather();
  }, []);

  if (loading || error || !data) return null;

  return (
    <div className={styles.weatherWidget}>
      Feels like {data.current.windchill_c}°C in {userCity || "your location"} | {data.current.condition.text}
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