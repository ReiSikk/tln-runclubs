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
        <AllClubsListItem />
        <AllClubsListItem />
        <AllClubsListItem />
        <AllClubsListItem />
    </ul>
  )
}

export default AllClubsList