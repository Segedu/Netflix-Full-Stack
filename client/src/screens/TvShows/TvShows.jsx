import { useState, useContext } from 'react';
import { showObjDetails, mainCardsDisplay, filterByGenres } from '../../clientUtils/clientUtils';
import Context from '../../components/context';
import { Redirect } from "react-router-dom";
import Spinner from '../../components/Spinner/Spinner';
import MainBanner from '../../components/MainBanner';
import style from '../Home/Home.module.css';

const TvShows = () => {
    const [isRedirect, setIsRedirect] = useState(false),
        [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false),
        { auth, isLoading, tvShows, watchList, favoritesList, setFavoritesList, setWatchList, setMovieDetails, setMovieToPlay, preferences } = useContext(Context);

    const drama = filterByGenres(18, tvShows),
        crime = filterByGenres(80, tvShows),
        comedy = filterByGenres(35, tvShows),
        family = filterByGenres(10751, tvShows),
        reality = filterByGenres(10764, tvShows),
        fantasy = filterByGenres(10765, tvShows),
        mystery = filterByGenres(9648, tvShows),
        animation = filterByGenres(16, tvShows),
        documentary = filterByGenres(99, tvShows);

    const dramaElements = mainCardsDisplay(auth, 'tvShows', drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        crimeElements = mainCardsDisplay(auth, 'tvShows', crime, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        comedyElements = mainCardsDisplay(auth, 'tvShows', comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        familyElements = mainCardsDisplay(auth, 'tvShows', family, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        realityElements = mainCardsDisplay(auth, 'tvShows', reality, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        fantasyElements = mainCardsDisplay(auth, 'tvShows', fantasy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        mysteryElements = mainCardsDisplay(auth, 'tvShows', mystery, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        animationElements = mainCardsDisplay(auth, 'tvShows', animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        documentaryElements = mainCardsDisplay(auth, 'tvShows', documentary, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences);

    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            <h1>Reality</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{realityElements}</section>}</div>
            <h1>Drama</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{dramaElements}</section>}</div>
            <h1>Crime</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{crimeElements}</section>}</div>
            <h1>Comedy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{comedyElements}</section>}</div>
            <h1>Mystery</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{mysteryElements}</section>}</div>
            <h1>Animation</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{animationElements}</section>}</div>
            <h1>Family</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{familyElements}</section>}</div>
            <h1>Documentary</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{documentaryElements}</section>}</div>
            <h1>Fantasy</h1>
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{fantasyElements}</section>}</div>
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default TvShows;

