import React from 'react';
import { searchData, searchInputHandler, suggestionHandler } from '../clientUtils/clientUtils';
import style from '../screens/Home/Home.module.css';
import { IoIosSearch } from 'react-icons/io';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults, setSuggestions, movies }) {

    // searchData(searchTerm, data, setSuggestions, setSearchTerm); //!searchInputHandler function
    {/* <button onClick={() => searchData(searchTerm, data, setSuggestions, setSearchTerm)} className={style.searchBtn}>Search</button> */ }//!ui search btn

    return (
        <form className={style.searchNav}>
            <input onChange={(e) => {
                searchInputHandler(e.target.value, setSearchTerm);
                suggestionHandler(searchTerm, setSearchTerm, setSuggestions);
            }} className={style.searchInput} value={searchTerm} inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
            <button onClick={() => searchData(searchTerm, movies, setSearchResults, setSearchTerm)} className={style.searchBtn}><IoIosSearch /></button>
        </form>
    )
}

export default SearchBar;
