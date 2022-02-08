import React from 'react';
import { getMovies, searchInputHandler } from '../clientUtils/clientUtils';
import styles from '../screens/Home/Home.module.css';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults }) {

    return (
        <form className={styles.searchNav}>
            <input onChange={(e) => searchInputHandler(e.target.value, setSearchTerm)} value={searchTerm} className={styles.searchInput} type="text" inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
            <button onClick={() => getMovies(searchTerm, setSearchResults)} className={styles.searchBtn}>Search</button>
        </form>
    )
}

export default SearchBar;
