import { useContext, useState, useRef } from "react";
import { showObjDetails, mainCardsDisplay } from '../../clientUtils/clientUtils';
import Preferences from "../../components/Preferences/Preferences";
import Context from "../../components/context";
import { Redirect } from "react-router-dom";
import Spinner from '../../components/Spinner/Spinner';
import MainBanner from "../../components/MainBanner";
import "bootstrap/dist/css/bootstrap.css";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Slider from "react-slick";
import style from './Home.module.css';


// const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 4
// };

const Home = () => {

    const [isRedirect, setIsRedirect] = useState(false),
        [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false),
        { auth, setShowPreferencesDialog, showPreferencesDialog, isLoading, movies, tvShows, watchList, favoritesList, setFavoritesList, setWatchList, setMovieDetails, setMovieToPlay, searchResults, topRated, popular, preferences } = useContext(Context);
    // const [sliderRef, setSliderRef] = useState(null);

    const searchResultsElements = mainCardsDisplay(auth, "searchResults", searchResults, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        topRatedElements = mainCardsDisplay(auth, "topRated", topRated, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        popularElements = mainCardsDisplay(auth, "popular", popular, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        watchListElements = mainCardsDisplay(auth, "watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        favoritesElements = mainCardsDisplay(auth, "favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        moviesElements = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences),
        tvShowsElements = mainCardsDisplay(auth, "tvShows", tvShows, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer, preferences);

    return (
        <div className={style.cardsContainer}>
            {auth ? setShowPreferencesDialog(true) : null}
            {auth ? <>
                {/* <Preferences /> */}
                <MainBanner />
                {/* {isLoading ? <Spinner /> : <Slider ref={setSliderRef} {...settings}>{topRatedElements}</Slider>} */}
                {/* <button onClick={sliderRef?.slickNext}> next</button> */}
                {/* <button onClick={sliderRef?.slickPrev}> prev</button> */}
                <div className={style.cardsRow} >{searchResultsElements ? searchResultsElements : ""}</div>
                <h1>Top Rated</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{topRatedElements}</section>}</div>

                <h1>Popular</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{popularElements}</section>}</div>

                <h1>My List</h1>
                <div className={style.watchListCards}>{isLoading ? <Spinner /> : watchListElements}</div>
                <h1>My Favorites</h1>
                <div className={style.favoritesCards}>{isLoading ? <Spinner /> : favoritesElements}</div>
                <h1>Movies</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{moviesElements}</section>}</div>
                <h1>TV shows</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{tvShowsElements}</section>}</div>
            </> : <>
                <MainBanner />
                <h1>Top Rated</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{topRatedElements}</section>}</div>
                <h1>Popular</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{popularElements}</section>}</div>
                <h1>Movies</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{moviesElements}</section>}</div>
                <h1>TV shows</h1>
                <div className={style.cardsRow}>{isLoading ? <Spinner /> : <section className={style.slider}>{tvShowsElements}</section>}</div>
            </>
            }
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div >
    )
}

export default Home;

