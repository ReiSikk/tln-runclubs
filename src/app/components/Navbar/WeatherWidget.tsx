"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// Styles
import styles from './WeatherWidget.module.css'

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


const getUserLocation = async (): Promise<string | null> => {
  if (!("geolocation" in navigator)) return null;

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      });
    });

    return await reverseGeocode(position.coords.latitude, position.coords.longitude);
  } catch {
    return null;
  }
};

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const city = await getUserLocation();
        if (city) setUserCity(city);

        const res = await fetch(`/api/weather?city=${encodeURIComponent(city || "Tallinn")}`);
        if (res.ok) {
          setData(await res.json());

          // Trigger animation on mount
           setTimeout(() => setIsVisible(true), 100);
        }
      } catch (error) {
        console.error("Weather error:", error);
      }
    }

    fetchWeatherData();
    
  }, []);

  if (!data) return null;


  return (
    <div className={`${styles.weatherWidget} ${isVisible ? styles.visible : ''}`} data-testid="weather-widget">
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