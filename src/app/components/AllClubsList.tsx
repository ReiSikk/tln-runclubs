import AllClubsListItem from './AllClubsListItem'
import { RunClub } from '../lib/types'
import styles from "../page.module.css"

function AllClubsList({clubs, searchTerm, isLoading, isError, }: { searchTerm: string; clubs: RunClub[], isLoading: boolean; isError: boolean }) {

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
  
  return (
    <ul className={`${styles.allClubsList} list-block`}>
      {clubs.length > 0 ? (
        clubs.map(club => (
          <AllClubsListItem key={club._id} club={club} />
        ))
      ) : (
        <li className={`${styles.noResults} fp`}>No clubs found matching  <strong> &quot;{searchTerm}&quot; </strong>. Please adjust your search criteria.</li>
      )}
    </ul>
  )
}

export default AllClubsList