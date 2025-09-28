"use client";

import AllClubsListItem from './AllClubsListItem'
import { RunClub } from '../lib/types'
import styles from "../page.module.css"
import getRunClubs from '../lib/hooks/useRunClubs'

function AllClubsList({ searchTerm }: { searchTerm: string }) {
  const { data: clubs = [], isLoading, isError } = getRunClubs();

  if (isLoading) {
    return (
      <ul className={`${styles.allClubsList} list-block error`}>
      <li className={`${styles.noResults} fp`}>
          Loading clubs...
        </li>
      </ul> 
    )
  }
  
  if (isError) {
    return (
      <ul className={`${styles.allClubsList} list-block error`}>
        <li className={`${styles.noResults} fp`}>
          Error loading clubs
        </li>
      </ul>
    );
  }

  // Filter clubs based on search term
  const filteredClubs = clubs.filter((club: RunClub) => {
    if (searchTerm === '') {
      return true; // Show all clubs if no search term
    }
    // Search in club name, location, or any other relevant fields
    return (
      club.name?.toLowerCase().includes(searchTerm) ||
      club.location?.toLowerCase().includes(searchTerm)
    );
  });
  
  return (
    <ul className={`${styles.allClubsList} list-block`}>
      {filteredClubs.length > 0 ? (
        filteredClubs.map(club => (
          <AllClubsListItem key={club._id} club={club} />
        ))
      ) : (
        <li className={`${styles.noResults} fp`}>No clubs found matching  <strong> "{searchTerm}" </strong>. Please adjust your search criteria.</li>
      )}
    </ul>
  )
}

export default AllClubsList