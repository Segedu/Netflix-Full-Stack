import React, { useContext } from 'react';
import { searchData, searchInputHandler, getSuggestionsOnSearch } from '../../clientUtils/clientUtils';
import Context from '../context';
import { IoIosSearch } from 'react-icons/io';
import style from './SearchBar.module.css';

function SearchBar({ searchTerm, setSearchTerm, setSearchResults, setSuggestions, suggestions }) {
    const { movies, tvShows } = useContext(Context);

    return (
        <>
            <form className={style.searchNav} >
                <input onChange={(e) => {
                    searchInputHandler(e.target.value, setSearchTerm);
                    getSuggestionsOnSearch(searchTerm, setSuggestions, movies, tvShows);
                }} className={style.searchInput} value={searchTerm} inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
                <button className={style.searchBtn} onClick={(e) => {
                    e.preventDefault();
                    searchData(searchTerm, movies, tvShows, setSearchResults, setSearchTerm);
                }}><IoIosSearch title="Search" className={style.icons} /></button>
            </form >
            {suggestions ? suggestions.map(media => media.title).splice(0, 10) : ''}
        </>
    )
}

export default SearchBar;
