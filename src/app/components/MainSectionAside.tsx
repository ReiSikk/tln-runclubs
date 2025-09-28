"use client"
import { useState } from 'react';
// Components
import AllClubsList from './AllClubsList'
import SearchBar from './SearchBar'
import styles from "../page.module.css"

function HomeMainAside() {
  const [inputText, setInputText] = useState("");

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <aside className={`${styles.mainSection__side} col-m-12 col-t-6 col-d-8`}>
        <h3 className={`${styles.side__title} h3`}>All run clubs</h3>
        <SearchBar inputHandler={inputHandler} />
        <AllClubsList searchTerm={inputText} />
    </aside>
  )
}

export default HomeMainAside