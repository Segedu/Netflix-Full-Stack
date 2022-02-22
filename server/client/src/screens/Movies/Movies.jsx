import { useState } from 'react';
import { showObjDetails, mainCardsDisplay, filterByGenres } from '../../clientUtils/clientUtils';
import { Redirect } from 'react-router-dom';
import MainBanner from '../../components/MainBanner';
import Spinner from '../../components/Spinner/Spinner';
import style from '../Home/Home.module.css';

const Movies = ({ isLoading, auth, movies, error, watchList, setWatchList, setMovieToPlay, setMovieDetails, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const action = filterByGenres(28, movies)
    const drama = filterByGenres(18, movies)
    const crime = filterByGenres(80, movies)
    const comedy = filterByGenres(35, movies)
    const adventure = filterByGenres(12, movies)
    const animation = filterByGenres(16, movies)
    const romance = filterByGenres(10749, movies)
    const documentary = filterByGenres(99, movies)

    const actionElements = mainCardsDisplay(auth, "movies", action, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const dramaElements = mainCardsDisplay(auth, "movies", drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const crimeElements = mainCardsDisplay(auth, "movies", crime, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const comedyElements = mainCardsDisplay(auth, "movies", comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const adventureElements = mainCardsDisplay(auth, "movie", adventure, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const animationElements = mainCardsDisplay(auth, "movies", animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const romanceElements = mainCardsDisplay(auth, "movies", romance, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const documentaryElements = mainCardsDisplay(auth, "movies", documentary, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);


    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            <h1>Action</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{actionElements}</section>}</div>
            <h1>Drama</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{dramaElements}</section>}</div>
            <h1>Crime</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{crimeElements}</section>}</div>
            <h1>Comedy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{comedyElements}</section>}</div>
            <h1>Adventure</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{adventureElements}</section>}</div>
            <h1>Animation</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{animationElements}</section>}</div>
            <h1>Romance</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{romanceElements}</section>}</div>
            <h1>Documentary</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{documentaryElements}</section>}</div>
            {error ? <p style={{ color: "red" }} > error</p> : ""}
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default Movies;

