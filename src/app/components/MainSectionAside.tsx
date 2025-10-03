"use client"

// Hooks
import { useState } from 'react';
import getRunClubs from '../lib/hooks/useRunClubs'
import styles from "../page.module.css"
// Components
import AllClubsList from './AllClubsList'
import SearchBar from './SearchBar'
import { FilterSelect } from './FilterSelect';
// Types
import { RunClub } from '../lib/types';

function HomeMainAside() {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState('all')

  // Fetch clubs data to derive filter options
  const { data: clubs = [], isLoading, isError } = getRunClubs();

  // Handle search input
  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

// Filter options should be derived from the data of the clubs.city field. each unique city should be an option.
const uniqueCities = isLoading ? [] : [...new Set(
  clubs
    .filter(club => club.city && club.city.trim())
    .map(club => club.city)
)];

  // Calculate counts for each city
  const getCityCount = (cityValue: string) => {
    if (cityValue === 'all') {
      return clubs.length;
    }
    return clubs.filter(club => 
      club.city === cityValue
    ).length;
  };

// Create filter options array
const filterOptions: { value: string; label: string; count: number }[] = [
  { value: 'all', label: 'All Cities', count: clubs.length },
  ...uniqueCities.map(city => ({ 
    value: city,
    label: city,
    count: getCityCount(city)
  }))
];

  // Function to filter clubs based on search term and selected city filter
  const getFilteredClubs = () => {
    if (isLoading || isError) return [];

    // Search filter
    const searchFiltered = clubs.filter((club: RunClub) => {
      if (inputText === '') return true;
      return (
        club.name?.toLowerCase().includes(inputText) ||
        club.location?.toLowerCase().includes(inputText) ||
        club.city?.toLowerCase().includes(inputText)
      );
    });

    // City filter
    return filter === 'all' 
      ? searchFiltered 
      : searchFiltered.filter(club => club.city === filter);
  };

  const filteredClubs = getFilteredClubs();

  return (
    <aside className={`${styles.mainSection__side} col-m-12 col-t-6 col-d-8`}>
        <h3 className={`${styles.side__title} h3`}>All run clubs<span className={`${styles.side__count}`}>{filteredClubs.length}</span></h3>
        <div className={`${styles.side__filters} fp`}>
          <SearchBar inputHandler={inputHandler} />
          <FilterSelect value={filter} onValueChange={setFilter} options={filterOptions} placeholder='Select a filter' />
        </div>
        <AllClubsList searchTerm={inputText} clubs={filteredClubs} isLoading={isLoading} isError={isError} />
    </aside>
  )
}

export default HomeMainAside