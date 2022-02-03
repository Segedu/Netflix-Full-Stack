import { useState } from "react";
import { addToList, removeFromList, showObjDetails, playVideo, mainCardsDisplay } from '../../clientUtils/clientUtils';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { API_KEY_MOVIES } from '../../logic/key';
import styles from './Home.module.css';
import axios from "axios";

const Home = ({ movies, tvShows, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [searchResults, setSearchResults] = useState([])
    const [isRedirect, setIsRedirect] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    function getMovies(searchTerm) {
        const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY_MOVIES}`;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                if (response.data.Search) {
                    setSearchResults(response.data.Search);
                }
            }).catch(error => {
                console.log(error);
            })
    }

    const moviesElements = mainCardsDisplay("movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const tvShowsElements = mainCardsDisplay("tvShows", tvShows, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const watchListElements = mainCardsDisplay("watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, favoritesList, setFavoritesList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const favoritesElements = mainCardsDisplay("favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    // const searchResultsElements = mainCardsDisplay("searchResults", searchResults, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);


    const searchInputHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    const searchResultsElements = searchResults.map((movie) =>
        <section key={movie.imdbID}>
            <img src={movie.Poster} />
            <article className="details">
                <h4>{movie.Title}</h4>
                <article className="buttonsCont">
                    <button onClick={() => playVideo(movie.video, setMovieToPlay, searchResults, setIsRedirectToVideoPlayer)}><BsPlayCircle fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(searchResults, movie.id, watchList, setWatchList, "watchList")}> <HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(movie.id, watchList, setWatchList, "watchList")}> <HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(searchResults, movie.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section>
    )


    return (
        <div className="cardsContainer">
            <div className="HomePageTrailer"><iframe width="1366" height="625" src="https://www.youtube-nocookie.com/embed/GV3HUDMQ-F8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
            <div className="searchNav">
                <input onChange={(e) => searchInputHandler(e.target.value)} value={searchTerm} className={styles.searchInput} type="text" inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
                <button onClick={() => getMovies(searchTerm)} className={styles.searchBtn}>Search</button>
            </div>
            <div className="cards" >{searchTerm ? searchResultsElements : ""}</div>
            <h1>Movies</h1>
            <div className="cards" >{moviesElements}</div>
            <h1>TV shows</h1>
            <div className="cards" >{tvShowsElements}</div>
            <h1>Your Watch List</h1>
            <div className="watchListCards">{watchListElements}</div>
            <h1>Your Favorites</h1>
            <div className="favoritesCards"> {favoritesElements}</div>
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div >
    )
}

export default Home;

