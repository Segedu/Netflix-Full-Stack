import { useState } from "react";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Redirect } from "react-router-dom";
import { addToUserList, playVideo } from '../../clientUtils/clientUtils';
import style from './Details.module.css';
import '../../App.css';

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
                <button onClick={() => playVideo(data, movieDetails.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className="icons" /></button>
                <button onClick={() => addToUserList(data, movieDetails._id, watchList, setWatchList, watchList, favoritesList)}><HiOutlinePlusCircle title="Add to watch List" className="icons" /></button>
                <button onClick={() => addToUserList(data, movieDetails._id, favoritesList, setFavoritesList, watchList, favoritesList)}><BsHandThumbsUp title="Add to favorites List" className="icons" /></button>
            </article>
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>)
}

export default Details;