import Spinner from "../../components/Spinner";
import { useState } from "react";
import { showObjDetails, mainCardsDisplay, filterByGenres } from '../../clientUtils/clientUtils';
import { Redirect } from "react-router-dom";
import MainBanner from "../../components/MainBanner";
import style from '../Home/Home.module.css';

const TvShows = ({ isLoading, auth, tvShows, error, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const reality = filterByGenres(10764, tvShows);
    const drama = filterByGenres(18, tvShows);
    const crime = filterByGenres(80, tvShows);
    const comedy = filterByGenres(35, tvShows);
    const mystery = filterByGenres(9648, tvShows);
    const animation = filterByGenres(16, tvShows);
    const family = filterByGenres(10751, tvShows);
    const documentary = filterByGenres(99, tvShows);
    const fantasy = filterByGenres(10765, tvShows);

    const realityElements = mainCardsDisplay(auth, "tvShows", reality, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const dramaElements = mainCardsDisplay(auth, "tvShows", drama, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const crimeElements = mainCardsDisplay(auth, "tvShows", crime, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const comedyElements = mainCardsDisplay(auth, "tvShows", comedy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const mysteryElements = mainCardsDisplay(auth, "tvShows", mystery, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const animationElements = mainCardsDisplay(auth, "tvShows", animation, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const familyElements = mainCardsDisplay(auth, "tvShows", family, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const documentaryElements = mainCardsDisplay(auth, "tvShows", documentary, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const fantasyElements = mainCardsDisplay(auth, "tvShows", fantasy, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

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
            {error ? <p style={{ color: "red" }} > error</p> : ""}
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default TvShows;

