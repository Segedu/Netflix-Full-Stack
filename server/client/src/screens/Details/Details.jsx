import { useState } from "react";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Redirect } from "react-router-dom";
import { addToUserList, playVideo } from '../../clientUtils/clientUtils';
import { BsStar } from "react-icons/bs";
import style from './Details.module.css';
// import style from '../../App.css'

const Details = ({ auth, movies, tvShows, movieDetails, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);
    let data = [];
    { movieDetails.type == "Movie" ? data = movies : data = tvShows }

    return (
        <div className={style.Details}>
            <img src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} />
            <article className={style.DetailsDisplay}>
                <h2>{movieDetails.title ? movieDetails.title : movieDetails.name}</h2>
                <p>{movieDetails.vote_average} <BsStar /></p>
                <p>{movieDetails.vote_count} people liked it</p>
                <h3>{movieDetails.overview}</h3>
                <article className={style.buttonsCont}>
                    {auth ? <>
                        <button onClick={() => playVideo(data, movieDetails.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                        <button onClick={() => addToUserList(data, movieDetails._id, watchList, setWatchList, watchList, favoritesList)}><HiOutlinePlusCircle title="Add to watch List" className={style.icons} /></button>
                        <button onClick={() => addToUserList(data, movieDetails._id, favoritesList, setFavoritesList, watchList, favoritesList)}><BsHandThumbsUp title="Add to favorites List" className={style.icons} /></button>
                    </> : <>
                        <button onClick={() => playVideo(data, movieDetails.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                    </>}
                </article>
            </article>
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default Details;