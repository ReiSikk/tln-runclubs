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
    console.log("Geolocation is not available");
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: false
      })
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
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkPermissionAndFetchWeather() {
      try {
        // Check if permissions API is available
        if ('permissions' in navigator) {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          
          if (permission.state === 'denied') {
            setHasLocationPermission(false);
            setLoading(false);
            return; // Don't render anything
          }
          
          if (permission.state === 'prompt') {
            setHasLocationPermission(false);
            setLoading(false);
            return; // Don't render anything
          }
          
          // Permission is granted
          setHasLocationPermission(true);
        }

        // Get user location
        const city = await getUserLocation();
        
        // If getUserLocation failed but we expected it to work, don't render
        if (hasLocationPermission && !city) {
          setHasLocationPermission(false);
          setLoading(false);
          return;
        }

        if (city) {
          setUserCity(city);
        }
        
        // Fetch weather data
        const weatherCity = city || "Tallinn";
        const res = await fetch(`/api/weather?city=${encodeURIComponent(weatherCity)}`);
        
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
        
      } catch (error) {
        console.error("Weather widget error:", error);
        setError(error instanceof Error ? error.message : String(error));
        setHasLocationPermission(false);
      } finally {
        setLoading(false);
      }
    }

    checkPermissionAndFetchWeather();
  }, []);

  if (loading || error || !data || hasLocationPermission === false) {
    return null;
  }

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