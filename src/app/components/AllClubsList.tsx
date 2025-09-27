import React from 'react'
import AllClubsListItem from './AllClubsListItem'
import { RunClub } from '../lib/types'
import styles from "../page.module.css"

interface AllClubsListProps {
  clubs: RunClub[];
}

function AllClubsList({ clubs }: AllClubsListProps) {
  return (
    <ul className={`${styles.allClubsList} list-block`}>
      {clubs.map(club => (
        <AllClubsListItem key={club._id} club={club} />
      ))}
    </ul>
  )
}

export default AllClubsList