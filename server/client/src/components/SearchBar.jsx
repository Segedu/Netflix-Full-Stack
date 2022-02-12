import React from 'react';
import { searchData, searchInputHandler, suggestionHandler } from '../clientUtils/clientUtils';
// import style from '../screens/Home/Home.module.css';
import { IoIosSearch } from 'react-icons/io';
import style from './SearchBar.module.css';
import TvShows from '../screens/TvShows/TvShows';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults, setSuggestions, movies, tvShows }) {

    return (
        <form className={style.searchNav} >
            <input onChange={(e) => {
                searchInputHandler(e.target.value, setSearchTerm);
            }} className={style.searchInput} value={searchTerm} inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
            <button className={style.searchBtn} onClick={(e) => {
                e.preventDefault();
                searchData(searchTerm, movies, tvShows, setSearchResults, setSearchTerm)
            }}
            ><IoIosSearch title="Search" className={style.icons} /></button>
        </form >
    )
}

export default SearchBar;
