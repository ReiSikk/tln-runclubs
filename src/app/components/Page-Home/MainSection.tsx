"use client";

import React, { useState } from "react";
import { TodayClubsList } from "./Section-TodaysClubs/TodayClubsList";
import HomeMainAside from "./MainSectionAside";
import getRunClubs from "../../lib/hooks/useRunClubs";
import styles from '@/app/page.module.css'

function MainSection() {
    const [selectedCity, setSelectedCity] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
  
    // Fetch clubs data at the parent level
    const { data: clubs = [], isLoading, isError } = getRunClubs();

    // Generate unique cities and filter options at parent level
    const uniqueCities = isLoading ? [] : [...new Set(
        clubs
        .filter(club => club.city && club.city.trim())
        .map(club => club.city)
    )];

    const getCityCount = (cityValue: string) => {
        if (cityValue === 'all') {
        return clubs.length;
        }
        return clubs.filter(club => club.city === cityValue).length;
    };

    const filterOptions = [
        { value: 'all', label: 'All Cities', count: clubs.length },
        ...uniqueCities.map(city => ({ 
        value: city,
        label: city,
        count: getCityCount(city)
        }))
    ];

    // Filter clubs based on search term and selected city
    const getFilteredClubs = () => {
    if (isLoading || isError) return [];

    // Filter by city
    const cityFiltered = selectedCity === 'all' 
        ? clubs 
        : clubs.filter(club => club.city === selectedCity);

    // Filter by search term
    return searchTerm === '' 
        ? cityFiltered 
        : cityFiltered.filter((club) => (
            club.name?.toLowerCase().includes(searchTerm) ||
            club.location?.toLowerCase().includes(searchTerm) ||
            club.city?.toLowerCase().includes(searchTerm)
        ));
    };

    const filteredClubs = getFilteredClubs();

  return (
    <section className={`${styles.mainSection} fp`}>
        <div className={`${styles.mainSection__main} col-m-12 col-t-5 col-d-4`}>
        <h2 className={`${styles.mainSection__title} h3`}>
        Clubs running in {selectedCity === 'all' ? 'Estonia' : selectedCity} today
        </h2>
        <div className={styles.clubsList} id="home-clubs-list">
        <TodayClubsList
          clubs={filteredClubs}
          isLoading={isLoading}
          isError={isError}
         />
        </div>
        </div>
        <HomeMainAside 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          filterOptions={filterOptions}
          clubs={clubs}
          isLoading={isLoading}
          isError={isError}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
    </section>
  )
}

export default MainSection