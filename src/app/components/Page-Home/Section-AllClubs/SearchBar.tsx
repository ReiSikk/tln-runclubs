import React from 'react'
import styles from '@/app/page.module.css'
import { Search } from 'lucide-react'

function SearchBar({ inputHandler }: { inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
   <form role="search" aria-labelledby="clubs-search-label" className={styles.side__searchbar}>
  <label id="clubs-search-label" htmlFor="clubs-search" className="txt-label sr-only">
    Search run clubs
  </label>

  <div className={`${styles.searchField} fp`}>
    <Search 
        className={styles.searchField__icon} 
        aria-hidden="true" 
        focusable="false"
        width="20"
        height="20"
    />
    <input
      id="clubs-search"
      name="q"
      type="search"
      placeholder="Search clubs"
      className={`${styles.searchField__input} h5`}
      autoComplete="off"
      enterKeyHint="search"
      onChange={inputHandler}
      data-umami-event="Clicked on SearchBar"
    />
  </div>
</form>
  )
}

export default SearchBar