import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import YouTube from 'react-youtube';
import { BsStar } from "react-icons/bs";
import axios from "axios";
import vid from '../video/homepagetrailer.mp4';
import style from '../screens/Home/Home.module.css';

const stopMovie = (e) => {
    e.target.pause();
}

const playMovie = (e) => {
    e.target.play();
}

export function mainCardsDisplay(auth, str, data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer) {
    const elements = data.map(media =>
        <section className={style.cardsSection} key={media._id}>
            <article className={style.cardImage}>
                <h2>{media.title ? media.title : media.name}</h2>
                {/* <img src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`} alt={media.title ? media.title : media.name} /> */}
                <video
                    onMouseOver={playMovie}
                    onMouseOut={stopMovie}
                    src={vid}
                    poster={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
                    preload='none'
                    loop />

            </article>
            <article className={style.details} >
                <article className={style.buttonsCont}>
                    {!auth ? <button onClick={() => showObjDetails(data, media._id, setMovieDetails, setIsRedirect)}>< IoIosArrowDropdown title="Details" className={style.icons} /></button>
                        : <>
                            {str === "tvShows" || str === "movies" ? <>
                                <button onClick={() => showObjDetails(data, media._id, setMovieDetails, setIsRedirect)}>< IoIosArrowDropdown title="Details" className={style.icons} /></button>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, watchList, setWatchList, watchList, favoritesList)}><HiOutlinePlusCircle title="Add to watch list" className={style.icons} /></button>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, favoritesList, setFavoritesList, watchList, favoritesList)}><BsHandThumbsUp title="Like" className={style.icons} /></button>
                                <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                            </> : ""}
                            {str === "watchList" ? <>
                                <button onClick={() => showObjDetails(data, media._id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" className={style.icons} /></button>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, favoritesList, setFavoritesList, watchList, favoritesList)}><BsHandThumbsUp title="Like" className={style.icons} /></button>
                                <button onClick={() => deleteFromUserList(auth.localId, media._id, watchList, setWatchList, watchList, favoritesList)}><HiOutlineMinusCircle title="Remove from watch list" className={style.icons} /></button>
                                <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                            </> : ""}
                            {str === "favoritesList" ? <>

                                <button onClick={() => showObjDetails(data, media._id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" className={style.icons} /></button>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, watchList, setWatchList, watchList, favoritesList)}><HiOutlinePlusCircle title="Add to watch list" className={style.icons} /></button>
                                <button onClick={() => deleteFromUserList(auth.localId, media._id, favoritesList, setFavoritesList, watchList, favoritesList)}><HiOutlineMinusCircle title="Remove from watch list" className={style.icons} /></button>
                                <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                            </> : ""}
                            {str === "searchResults" ? <>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, watchList, setWatchList)}><HiOutlinePlusCircle title="Add to watch list" className={style.icons} /></button>
                                <button onClick={() => addToUserList(auth.localId, data, media._id, favoritesList, setFavoritesList)}><BsHandThumbsUp title="Like" className={style.icons} /></button>
                                <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className={style.icons} /></button>
                            </> : ""}
                        </>
                    }
                </article>
                <article className={style.textDetailsCont}>
                    <h3><BsStar /> {media.vote_average}</h3>
                </article>
            </article>
        </section >
    )
    return elements;
}

export function getMovies(searchTerm, setSearchResults, API_KEY_MOVIES) {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY_MOVIES}`;
    // setIsLoading(true)
    axios.get(url)
        .then(response => {
            if (response.data.Search) {
                setSearchResults(response.data.Search);
                // setIsLoading(false);
            }
        }).catch(error => {
            console.log(error);
        })
}

export function filterByGenres(filterCategory, mainMediaArray) {
    const filteredResult = mainMediaArray.filter((item) => (item.genre_ids ? item.genre_ids.indexOf(filterCategory) >= 0 : ""));
    return filteredResult
}

// export function filterByTitle(filterCategory, mainMediaArray) {
//     const filteredResult = mainMediaArray.filter((item) => (item.Title ? item.Title.indexOf(filterCategory) >= 0 : ""));
//     return filteredResult
// }

export function getData(route, setData, setIsLoading) {
    // export function getData(setIsLoading, setData) {

    setIsLoading(true);
    axios
        // .get('/json.json')
        .get(`/${route}`)
        .then(response => {
            console.log(response.data);
            setData(response.data)
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error.message, "you are in getting movies/Tv shows catch");
        });
}

export function addToUserList(authLocalId, dataArray, objId, listName, setFunction, watchList, favoritesList) {
    let updatedArrayAfterAdding = [];
    const foundObj = dataArray.find(obj => obj._id === objId);
    if (listName.indexOf(foundObj) > -1) {
        alert(`already in your ${listName}`);
    } else {
        updatedArrayAfterAdding = [foundObj, ...listName];
        setFunction(updatedArrayAfterAdding);
        if (listName === watchList) {
            addToWatchList(authLocalId, updatedArrayAfterAdding)
        } else if (listName === favoritesList) {
            addToFavoritesList(authLocalId, updatedArrayAfterAdding)
        }
    }
}

export function addToWatchList(authLocalId, updatedArrayAfterAdding) {
    axios
        .patch(`/users/${authLocalId}`, {
            watchList: updatedArrayAfterAdding
        })
        .then(function (response) {
            console.log(response.data.value);
            alert(`movie/Tv show added successfully to watch list`);
        })
        .catch(function (error) {
            console.log(error, `you are in add to watch list catch`);
        });
}

export function addToFavoritesList(authLocalId, updatedArrayAfterAdding) {
    axios
        .patch(`/users/${authLocalId}`, {
            favoritesList: updatedArrayAfterAdding
        })
        .then(function (response) {
            console.log(response.data.value);
            alert(`movie/Tv show added successfully to favorites list`);
        })
        .catch(function (error) {
            console.log(error, `you are in add to favorites list catch`);
        });
}

export function getUserOrMediaDataById(route, id, setWatchList, setFavoritesList) {
    axios
        .get(`/${route}/${id}`)
        .then(response => {
            setWatchList(response.data.watchList);
            setFavoritesList(response.data.favoritesList)
        })
        .catch(error => {
            console.log(error, "you are in get user/media by id catch");
        });
}

export const showObjDetails = (dataArray, objId, setFunction, setIsRedirect) => {
    const foundObj = dataArray.find(obj => obj._id === objId);
    setFunction(foundObj);
    setIsRedirect(true);
}

export function insertNewUser(route, localId, authEmail) {
    const _id = localId,
        email = authEmail,
        watchList = [],
        favoritesList = [];

    axios.post(`/${route}`, {
        _id,
        email,
        watchList,
        favoritesList
    })
        .then(response => {
            console.log(response.data);
            alert("Your user account created successfully");
        })
        .catch(error => {
            console.log(error, "you are in the create new user catch");
        });
}

export const deleteFromUserList = (authLocalId, objId, listName, setFunction, watchList, favoritesList) => {
    const updatedArrayAfterRemove = [...listName].filter(obj => obj._id !== objId);
    setFunction(updatedArrayAfterRemove);
    if (listName == watchList) {
        deleteFromWatchList(authLocalId, objId)
    } else if (listName == favoritesList) {
        deleteFromFavorites(authLocalId, objId)
    }
}

export function deleteFromWatchList(authLocalId, objId) {
    axios
        .patch(`/users/delete/watchList/${authLocalId}`, {
            _id: objId,
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("you are in the delete media item catch");
            console.log(error);
        })
}

export function deleteFromFavorites(authLocalId, objId) {
    axios
        .patch(`/users/delete/favoritesList/${authLocalId}`, {
            _id: objId,
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("you are in the delete media item catch");
            console.log(error);
        })
}

export function searchData(input, dataArray, setArray, setInput) {
    if (input) {
        const search_result = dataArray.filter(element => {
            const regex = new RegExp(`${input}`, "gi");
            return (element.title.match(regex))
        })
        setArray(search_result);
        setInput(input);
    }
}

export const searchInputHandler = (searchTerm, setSearchTerm) => {
    setSearchTerm(searchTerm);
}

export function playVideo(dataArray, videoUrl, setClickedObj, setRedirect) {
    const foundObj = dataArray.find(obj => obj.video === videoUrl);
    setClickedObj(foundObj);
    setRedirect(true);
}

export const suggestionHandler = (searchTerm, setSearchTerm, setSuggestions) => {
    setSearchTerm(searchTerm);
    setSuggestions([]);
}

//! additional data
// searchData(searchTerm, data, setSuggestions, setSearchTerm); //!searchInputHandler function
{/* <button onClick={() => searchData(searchTerm, data, setSuggestions, setSearchTerm)} className={styles.searchBtn}>Search</button> */ }//!ui search btn
