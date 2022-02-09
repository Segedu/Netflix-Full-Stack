import { useState } from "react";
import { getMovies, addToUserList, deleteFromUserList, showObjDetails, playVideo, mainCardsDisplay, filterByGenres, filterByTitle } from '../../clientUtils/clientUtils';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { API_KEY_MOVIES } from '../../logic/key';
import Spinner from '../../components/Spinner';
import MainBanner from "../../components/MainBanner";
import style from './Home.module.css';
import axios from "axios";

const Home = ({ isLoading, searchTerm, setSearchTerm, searchResults, setSearchResults, auth, movies, tvShows, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);
    const [suggestions, setSuggestions] = useState("");

    getMovies(searchTerm, setSearchResults, API_KEY_MOVIES);

    // const moviesElements = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const Action = filterByGenres('Action', movies);
    const Drama = filterByGenres('Drama', movies);
    const Comedy = filterByGenres('Comedy', movies);
    const Adventure = filterByGenres('Adventure', movies);

    const Animation = filterByTitle('Animation', tvShows);
    const Family = filterByTitle('Family', tvShows);
    const Horror = filterByTitle('Horror', tvShows);
    const Romance = filterByTitle('Romance', tvShows);

    const actionElements = mainCardsDisplay(auth, "movies", Action, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const dramaElements = mainCardsDisplay(auth, "movies", Drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const comedyElements = mainCardsDisplay(auth, "movies", Comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const adventureElements = mainCardsDisplay(auth, "movies", Adventure, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    const watchListElements = mainCardsDisplay(auth, "watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const favoritesElements = mainCardsDisplay(auth, "favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    const tvShowsElements = mainCardsDisplay(auth, "tvShows", tvShows, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const animationElements = mainCardsDisplay(auth, "tvShows", Animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const familyElements = mainCardsDisplay(auth, "tvShows", Family, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const romanceElements = mainCardsDisplay(auth, "tvShows", Romance, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const horrorElements = mainCardsDisplay(auth, "tvShows", Horror, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    // const searchResultsElements = mainCardsDisplay("searchResults", searchResults, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    // const searchResultsElements = searchResults.map(media =>
    //     <section key={media.imdbID}>
    //         <img src={media.Poster} />
    //         <article className="details">
    //             <h4>{media.Title}</h4>
    //             <article className="buttonsCont">
    //                 <button onClick={() => playVideo(media.video, setMovieToPlay, searchResults, setIsRedirectToVideoPlayer)}><BsPlayCircle fontSize="xx-large" color="white" /></button>
    //                 <button onClick={() => addToUserList(searchResults, media.id, watchList, setWatchList, watchList, favoritesList)}> <HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
    //                 <button onClick={() => deleteFromUserList(auth.localId, media.id, watchList, setWatchList, watchList, favoritesList)}> <HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
    //                 <button onClick={() => addToUserList(searchResults, media.id, favoritesList, setFavoritesList, watchList, favoritesList)}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
    //             </article>
    //         </article>
    //     </section>
    // )
    const key = "33e1714f2326d0c1e81bf46cf96bace4";
    function getttt(num) {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${num}`)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    // axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`)
    // axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`)
    // axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`)


    getttt(35);//!comedy
    // getttt(28);//action
    // getttt(27);//horror
    // getttt(10749);//romance
    // getttt(99);//docomentarie
    // getttt();
    // getttt();

    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            {/* <div className={style.cardsRow} ><section className={style.slider}>{moviesElements}</section></div> */}
            {/* <div className={style.cardsRow} >{searchTerm ? searchResultsElements : ""}</div> */}
            <h1>Top Rated</h1>

            <h1>Action</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{actionElements}</section>}</div>
            <h1>Drama</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{dramaElements}</section>}</div>
            <h1>Adventure</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{adventureElements}</section>}</div>
            <h1>Comedy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{comedyElements}</section>}</div>
            <h1>Your Watch List</h1>
            <div className={style.watchListCards}>{watchListElements}</div>
            <h1>Your Favorites</h1>
            <div className={style.favoritesCards}> {favoritesElements}</div>
            <h1>TV shows</h1>
            <div className={style.cardsRow} ><section className={style.slider}>{tvShowsElements}</section></div>
            <h1>Animation</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{animationElements}</section>}</div>
            <h1>Family</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{familyElements}</section>}</div>
            <h1>Romance</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{romanceElements}</section>}</div>
            <h1>Horror</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{horrorElements}</section>}</div>

            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div >
    )
}

export default Home;

