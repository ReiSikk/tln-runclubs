"use client"

import styles from "../../page.module.css"
// Components
import AllClubsList from './Section-AllClubs/AllClubsList'
import SearchBar from './Section-AllClubs/SearchBar'
import { FilterSelect } from './Section-AllClubs/FilterSelect';
// Types
import { RunClub } from '../../lib/types';

interface HomeMainAsideProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  filterOptions: { value: string; label: string; count: number }[];
  clubs: RunClub[];
  isLoading: boolean;
  isError: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function HomeMainAside({ 
  selectedCity, 
  onCityChange, 
  filterOptions, 
  clubs, 
  isLoading, 
  isError,
  searchTerm,
  onSearchChange
}: HomeMainAsideProps) {

  // Handle search input
 const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    onSearchChange(lowerCase);
  };

   // Filter clubs based on city and search
  const getFilteredClubs = () => {
    if (isLoading || isError) return [];

    // Filter by city
    const cityFiltered = selectedCity === 'all' 
      ? clubs 
      : clubs.filter(club => club.city === selectedCity);

    // Filter by search term
    return searchTerm === '' 
      ? cityFiltered 
      : cityFiltered.filter((club: RunClub) => (
          club.name?.toLowerCase().includes(searchTerm) ||
          club.location?.toLowerCase().includes(searchTerm) ||
          club.city?.toLowerCase().includes(searchTerm)
        ));
  };

  const filteredClubs = getFilteredClubs();

    // Calculate filtered clubs count for display
  const getFilteredClubsCount = () => {
    if (isLoading || isError) return 0;

    const cityFiltered = selectedCity === 'all' 
      ? clubs 
      : clubs.filter(club => club.city === selectedCity);

    const searchFiltered = searchTerm === '' 
      ? cityFiltered 
      : cityFiltered.filter((club: RunClub) => (
          club.name?.toLowerCase().includes(searchTerm) ||
          club.location?.toLowerCase().includes(searchTerm) ||
          club.city?.toLowerCase().includes(searchTerm)
        ));

    return searchFiltered.length;
  };

  return (
    <aside className={`${styles.mainSection__side} col-m-12 col-t-7 col-d-8`}>
        <h3 className={`${styles.side__title} h3`}>{selectedCity === 'all' ? 'All run clubs' : `Run clubs in ${selectedCity}`}<span className={`${styles.side__count}`}>{getFilteredClubsCount()}</span></h3>
        <div className={`${styles.side__filters} fp`}>
          <SearchBar inputHandler={inputHandler} />
          <FilterSelect 
            value={selectedCity} 
            onValueChange={onCityChange} 
            options={filterOptions} 
            placeholder='Select a filter' 
          />
        </div>
        <AllClubsList 
          clubs={filteredClubs} 
          searchTerm={searchTerm} 
          isLoading={isLoading} 
          isError={isError} 
        />
    </aside>
  )
}

export default HomeMainAside