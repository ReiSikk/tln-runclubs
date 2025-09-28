import React from 'react'
import styles from '../page.module.css'
import { Search } from 'lucide-react'

function SearchBar({ inputHandler }: { inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
   <form role="search" aria-labelledby="clubs-search-label" className={styles.side__searchbar}>
  <label id="clubs-search-label" htmlFor="clubs-search" className="txt-label sr-only">
    Search run clubs
  </label>

  <div className={styles.searchField}>
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
    />

    <button type="submit" className={`${styles.searchField__button} btn_small btn-txt-anim`} aria-label="Submit search">
      <span className="txt-main">Search</span>
      <span className="txt-hovered">Search</span>
    </button>
  </div>
</form>
  )
}

export default SearchBar