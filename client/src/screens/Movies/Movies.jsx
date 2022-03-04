import { useState, useContext } from 'react';
import { showObjDetails, mainCardsDisplay, filterByGenres } from '../../clientUtils/clientUtils';
import Context from '../../components/context';
import { Redirect } from 'react-router-dom';
import MainBanner from '../../components/MainBanner';
import Spinner from '../../components/Spinner/Spinner';
import style from '../Home/Home.module.css';

const Movies = () => {
    const [isRedirect, setIsRedirect] = useState(false),
        [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false),
        { auth, isLoading, movies, watchList, favoritesList, setFavoritesList, setWatchList, setMovieToPlay, setMovieDetails } = useContext(Context);

    const action = filterByGenres(28, movies),
        drama = filterByGenres(18, movies),
        crime = filterByGenres(80, movies),
        comedy = filterByGenres(35, movies),
        adventure = filterByGenres(12, movies),
        animation = filterByGenres(16, movies),
        romance = filterByGenres(10749, movies),
        documentary = filterByGenres(99, movies);

    const actionElements = mainCardsDisplay(auth, 'movies', action, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        dramaElements = mainCardsDisplay(auth, 'movies', drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        crimeElements = mainCardsDisplay(auth, 'movies', crime, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        adventureElements = mainCardsDisplay(auth, 'movies', adventure, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        animationElements = mainCardsDisplay(auth, 'movies', animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        romanceElements = mainCardsDisplay(auth, 'movies', romance, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        comedyElements = mainCardsDisplay(auth, 'movies', comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        documentaryElements = mainCardsDisplay(auth, 'movies', documentary, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);


    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            <h1>Action</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{actionElements}</section>}</div>
            <h1>Drama</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{dramaElements}</section>}</div>
            <h1>Crime</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{crimeElements}</section>}</div>
            <h1>Comedy</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{comedyElements}</section>}</div>
            <h1>Adventure</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{adventureElements}</section>}</div>
            <h1>Animation</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{animationElements}</section>}</div>
            <h1>Romance</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{romanceElements}</section>}</div>
            <h1>Documentary</h1>
            <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{documentaryElements}</section>}</div>
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default Movies;

