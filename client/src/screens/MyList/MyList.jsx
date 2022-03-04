import { useState, useContext } from "react";
import { showObjDetails, mainCardsDisplay } from '../../clientUtils/clientUtils';
import Context from '../../components/context';
import { Redirect } from "react-router-dom";
import style from '../Home/Home.module.css';
import '../../App.css';

const MyList = ({ setIsRedirect }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false),
        { auth, watchList, favoritesList, setFavoritesList, setWatchList, setMovieToPlay, setMovieDetails } = useContext(Context);

    const watchListElements = mainCardsDisplay(auth, "watchList", watchList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer),
        favoritesElements = mainCardsDisplay(auth, "favoritesList", favoritesList, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

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

