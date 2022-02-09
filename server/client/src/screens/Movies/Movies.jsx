import Spinner from "../../components/Spinner";
import { useState } from "react";
import { showObjDetails, mainCardsDisplay, filterByGenres } from '../../clientUtils/clientUtils';
import { Redirect } from "react-router-dom";
import MainBanner from "../../components/MainBanner";
import style from '../Home/Home.module.css';

const Movies = ({ isLoading, auth, movies, error, watchList, setWatchList, setMovieToPlay, setMovieDetails, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    // function filterByGenres(filterCategory, mainMoviesArray) {
    //     const filteredResult = mainMoviesArray.filter((item) => (item.genres ? item.genres.indexOf(filterCategory) >= 0 : ""));
    //     return filteredResult
    // }
    const Action = filterByGenres('Action', movies)
    const Crime = filterByGenres('Crime', movies)
    const Drama = filterByGenres('Drama', movies)
    const Comedy = filterByGenres('Comedy', movies)
    const Adventure = filterByGenres('Adventure', movies)
    const Animation = filterByGenres('Animation', movies)
    const Fantasy = filterByGenres('Fantasy', movies)

    // const elements = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const actionElements = mainCardsDisplay(auth, "movies", Action, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const crimeElements = mainCardsDisplay(auth, "movies", Crime, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const dramaElements = mainCardsDisplay(auth, "movies", Drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const comedyElements = mainCardsDisplay(auth, "movies", Comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const adventureElements = mainCardsDisplay(auth, "movies", Adventure, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const animationElements = mainCardsDisplay(auth, "movies", Animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const fantasyElements = mainCardsDisplay(auth, "movies", Fantasy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);


    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            {/* <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{elements}</section>}</div> */}
            <h1>Action</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{actionElements}</section>}</div>
            <h1>Drama</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{dramaElements}</section>}</div>
            <h1>Adventure</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{adventureElements}</section>}</div>
            <h1>Crime</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{crimeElements}</section>}</div>
            <h1>Comedy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{comedyElements}</section>}</div>
            <h1>Animation</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{animationElements}</section>}</div>
            <h1>Fantasy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{fantasyElements}</section>}</div>
            {error ? <p style={{ color: "red" }} > error</p> : ""}
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default Movies;

