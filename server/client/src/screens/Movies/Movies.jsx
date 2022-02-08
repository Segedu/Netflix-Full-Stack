import Spinner from "../../components/Spinner";
import { useState } from "react";
import { showObjDetails, mainCardsDisplay } from '../../clientUtils/clientUtils';
import { Redirect } from "react-router-dom";
import MainBanner from "../../components/MainBanner";
import style from '../Home/Home.module.css';

const Movies = ({ auth, movies, error, isLoading, watchList, setWatchList, setMovieToPlay, setMovieDetails, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);
    const [test, setTest] = useState(movies)
    // console.log(test);
    // const anima = test.filter(item => {
    //     if (item.genres.match("Action")) {
    //         return item;
    //     }
    // }
    // );

    function filterByGenres(filterCategory, mainMoviesArray) {
        const filteredResult = mainMoviesArray.filter((item) => (item.genres ? item.genres.indexOf(filterCategory) >= 0 : ""));
        return filteredResult
    }
    const action = filterByGenres('Action', movies)
    const crime = filterByGenres('Crime', movies)

    // const filter = 'Action';
    console.log({ action });
    console.log({ crime });
    const elements = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    // const action = mainCardsDisplay(auth, "movies", movies, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    return (
        <div className={style.cardsContainer}>
            <MainBanner />
            <div className={style.cardsRow} >{isLoading ? <Spinner /> : <section className={style.slider}>{elements}</section>}</div>
            {error ? <p style={{ color: "red" }} > error</p> : ""}
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default Movies;

