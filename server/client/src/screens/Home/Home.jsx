import { useState } from "react";
import { addToUserList, deleteFromUserList, showObjDetails, playVideo, mainCardsDisplay, filterByGenres, filterByTitle } from '../../clientUtils/clientUtils';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { API_KEY_MOVIES } from '../../logic/key';
import Spinner from '../../components/Spinner';
import MainBanner from "../../components/MainBanner";
import style from './Home.module.css';
import axios from "axios";

const Home = ({ isLoading, searchResults, auth, movies, tvShows, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const searchResultsElements = mainCardsDisplay(auth, "searchResults", searchResults, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    // const topRatedElements = mainCardsDisplay(auth, "topRated", topRated, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    // const popularElements = mainCardsDisplay(auth, "popular", popular, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    const watchListElements = mainCardsDisplay(auth, "watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const favoritesElements = mainCardsDisplay(auth, "favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const moviesElements = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const tvShowsElements = mainCardsDisplay(auth, "tvShows", tvShows, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);


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

    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            <div className={style.cardsRow} >{searchResultsElements ? searchResultsElements : ""}</div>
            <h1>Top Rated</h1>
            {/* <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{topRatedElements}</section>}</div> */}
            <h1>Popular</h1>
            {/* <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{popularElements}</section>}</div> */}
            <h1>Your Watch List</h1>
            <div className={style.watchListCards}>{isLoading ? <Spinner /> : watchListElements}</div>
            <h1>Your Favorites</h1>
            <div className={style.favoritesCards}>{isLoading ? <Spinner /> : favoritesElements}</div>
            <h1>Movies</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{moviesElements}</section>}</div>
            <h1>TV shows</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{tvShowsElements}</section>}</div>

            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div >
    )
}

export default Home;

