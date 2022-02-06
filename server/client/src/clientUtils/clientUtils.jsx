import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import YouTube from 'react-youtube';
import axios from "axios";
const moviesRoute = "movies",
    tvShowsRoute = "tvShows",
    usersRoute = "users";

//?works?
// const opts = {
//     height: "390",
//     width: "50%",
//     playerVars: {
//         autoplay: 1,
//         origin: 'https://localhost:3000'
//     }
// }

export function mainCardsDisplay(auth, str, data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer) {
    const elements = data.map(media =>
        <section key={media.id}>
            <img src={media.posterUrl ? media.posterUrl : ""} alt={media.title} />
            <article className="details" >
                <article className="buttonsCont">
                    {str === "tvShows" || str === "movies" ? <>
                        <button onClick={() => showObjDetails(str, data, media._id, setMovieDetails, setIsRedirect)}>< IoIosArrowDropdown title="Details" className="icons" /></button>
                        <button onClick={() => addToList(auth.localId, data, media._id, watchList, setWatchList)}><HiOutlinePlusCircle title="Add to watch list" className="icons" /></button>
                        <button onClick={() => addToList(auth.localId, data, media._id, favoritesList, setFavoritesList)}><BsHandThumbsUp title="Like" className="icons" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className="icons" /></button>
                    </> : ""}
                    {str === "watchList" ? <>
                        <button onClick={() => showObjDetails(str, data, media._id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" className="icons" /></button>
                        <button onClick={() => addToList(auth.localId, data, media._id, favoritesList, setFavoritesList)}><BsHandThumbsUp title="Like" className="icons" /></button>
                        <button onClick={() => deleteFromUserList(auth.localId, media._id, watchList, setWatchList)}><HiOutlineMinusCircle title="Remove from watch list" className="icons" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className="icons" /></button>
                    </> : ""}
                    {str === "favoritesList" ? <>
                        <button onClick={() => showObjDetails(str, data, media._id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" className="icons" /></button>
                        <button onClick={() => addToList(auth.localId, data, media._id, watchList, setWatchList)}><HiOutlinePlusCircle title="Add to watch list" className="icons" /></button>
                        <button onClick={() => deleteFromUserList(auth.localId, media._id, favoritesList, setFavoritesList)}><HiOutlineMinusCircle title="Remove from watch list" className="icons" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className="icons" /></button>
                    </> : ""}
                    {str === "searchResults" ? <>
                        <button onClick={() => addToList(auth.localId, data, media._id, watchList, setWatchList)}><HiOutlinePlusCircle title="Add to watch list" className="icons" /></button>
                        <button onClick={() => addToList(auth.localId, data, media._id, favoritesList, setFavoritesList)}><BsHandThumbsUp title="Like" className="icons" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" className="icons" /></button>
                    </> : ""}
                </article>
                <article className="textDetailsCont">
                    <p>{media.title}</p>
                    <p>{media.actors}</p>
                    <p>{media.year}</p>
                </article>
            </article>
            {/* <YouTube videoId={"6hB3S9bIaco"} opts={opts} /> */}
            {/* <YouTube videoId={media.video} opts={opts} /> */}
        </section >
    )
    return elements;
}

export function addToList(authLocalId, dataArray, objId, listName, setFunction) {
    let updatedArrayAfterAdding = [];
    const foundObj = dataArray.find(obj => obj._id === objId);
    if (listName.indexOf(foundObj) > -1) {
        alert(`already in your ${listName}`);
    } else {
        updatedArrayAfterAdding = [foundObj, ...listName];
        setFunction(updatedArrayAfterAdding);
        axios
            .patch(`/users/${authLocalId}`, {
                watchList: updatedArrayAfterAdding
            })
            .then(function (response) {
                console.log(response.data.value);
                alert(`movie/Tv show added successfully to ${listName}`);
            })
            .catch(function (error) {
                console.log(error, `you are in add to ${listName} catch`);
            });
    }
}

export function getData(route, setData) {
    axios
        .get(`/${route}`)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error.message, "you are in getting movies/Tv shows catch");
        });
}

export function getUserOrMediaDataById(route, id, setWatchList, setFavoritesList) {
    axios
        .get(`/${route}/${id}`)
        .then(response => {
            console.log(response.data);
            setWatchList(response.data.watchList);
            setFavoritesList(response.data.favoritesList)
        })
        .catch(error => {
            console.log(error, "you are in get user/media by id catch");
        });
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

export const deleteFromUserList = (authLocalId, objId, listName, setFunction) => {
    const updatedArrayAfterRemove = [...listName].filter(obj => obj._id !== objId);
    setFunction(updatedArrayAfterRemove);
    axios
        .patch(`/users/delete/${authLocalId}`, {
            _id: objId,
        })
        .then(function (response) {
            setFunction(response.data.value.watchList);
        })
        .catch(function (error) {
            console.log("you are in the delete media item catch");
            console.log(error);
        })
}

export const showObjDetails = (str, dataArray, objId, setFunction, setIsRedirect) => {
    const foundObj = dataArray.find(obj => obj.id === objId);
    setFunction(foundObj);
    setIsRedirect(true);
    getUserOrMediaDataById(str, objId);
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
