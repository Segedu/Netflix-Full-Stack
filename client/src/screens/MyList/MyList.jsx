import { useState } from "react";
import { showObjDetails, mainCardsDisplay } from '../../clientUtils/clientUtils';
import { Redirect } from "react-router-dom";
import style from '../Home/Home.module.css';
import '../../App.css';

const MyList = ({ auth, watchList, setWatchList, setMovieToPlay, favoritesList, setFavoritesList, setMovieDetails, setIsRedirect }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const watchListElements = mainCardsDisplay(auth, "watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    const favoritesElements = mainCardsDisplay(auth, "favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);
    return (
        <div className={style.cardsContainer}>
            <div className={style.watchListCont}>
                <h1>My List</h1>
                <div className={style.watchListCards}> {watchListElements}</div>
                <h1>My Favorites</h1>
                <div className={style.favoritesCards}> {favoritesElements}</div>
                {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
            </div>
        </div>
    )
}

export default MyList;

