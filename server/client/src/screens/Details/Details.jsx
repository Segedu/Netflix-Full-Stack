import { useState } from "react";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Redirect } from "react-router-dom";
import { addToList, playVideo } from '../../clientUtils/clientUtils';
import style from './Details.module.css';

const Details = ({ movies, tvShows, movieDetails, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);
    let data = [];
    { movieDetails.type == "Movie" ? data = movies : data = tvShows }

    return (
        <div className={style.Details}>
            <img src={movieDetails.posterUrl} />
            <article className={style.DetailsDisplay}>
                <h2>{movieDetails.title}</h2>
                <h3>{movieDetails.year}</h3>
                <p>{movieDetails.actors}</p>
                <p>{movieDetails.plot}</p>
                <button onClick={() => playVideo(data, movieDetails.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                <button onClick={() => addToList(data, movieDetails.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch List" fontSize="xx-large" color="white" /></button>
                <button onClick={() => addToList(data, movieDetails.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Add to favorites List" fontSize="xx-large" color="white" /></button>
            </article>
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>)
}

export default Details;