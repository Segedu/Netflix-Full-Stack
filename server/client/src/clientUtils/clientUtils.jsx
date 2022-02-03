import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import YouTube from 'react-youtube';
import axios from "axios";
const moviesRoute = "movies",
    tvShowsRoute = "tvShows",
    usersRoute = "users";

// const opts = {
//     height: "390",
//     width: "50%",
//     playerVars: {
//         autoplay: 1,
//         origin: 'https://localhost:3000'
//     }
// }

export function mainCardsDisplay(str, data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer) {
    const elements = data.map(media =>
        // <section key={str === "searchResults" ? media.imdbID : media.id}>

        <section key={media.id}>
            {/* <img src={str === "searchResults" ? media.Poster : media.posterUrl} alt={media.title} /> */}

            <img src={media.posterUrl} alt={media.title} />
            <article className="details" >
                <article className="buttonsCont">
                    {str === "tvShows" || str === "movies" ? <>
                        <button onClick={() => showObjDetails(data, media.id, setMovieDetails, setIsRedirect)}>< IoIosArrowDropdown title="Details" fontSize="x-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="x-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="x-large" color="white" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="x-large" color="white" /></button>
                    </> : ""}
                    {str === "watchList" ? <>
                        <button onClick={() => showObjDetails(data, media.id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" fontSize="x-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="x-large" color="white" /></button>
                        <button onClick={() => removeFromList(media.id, watchList, setWatchList, "watchList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="x-large" color="white" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="x-large" color="white" /></button>
                    </> : ""}
                    {str === "favoritesList" ? <>
                        <button onClick={() => showObjDetails(data, media.id, setMovieDetails, setIsRedirect)}><IoIosArrowDropdown title="Details" fontSize="x-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="x-large" color="white" /></button>
                        <button onClick={() => removeFromList(media.id, favoritesList, setFavoritesList, "favoritesList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="x-large" color="white" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="x-large" color="white" /></button>
                    </> : ""}
                    {str === "searchResults" ? <>
                        <button onClick={() => addToList(data, media.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="x-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="x-large" color="white" /></button>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="x-large" color="white" /></button>
                    </> : ""}
                </article>
                <article className="textDetailsCont">
                    {/* <p>{str = "searchResult" ? media.Title : media.title}</p> */}

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

export function addToList(dataArray, objId, listCategory, setFunction, listKeyName) {
    // axios
    //     .patch("/user/:id/watchList/:movie_id", {
    //         _id: objId,
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //         alert("movie/Tv show added successfully");
    //     })
    //     .catch(function (error) {
    //         console.log("you are in add to watch list catch");
    //         console.log(error);
    //     });

    const foundObj = dataArray.find(obj => obj.id === objId);
    if (listCategory.indexOf(foundObj) > -1) {
        alert(`already in your ${listKeyName}`)
    }
    else {
        const updatedArray = [foundObj, ...listCategory];
        setFunction(updatedArray);
        localStorage.setItem(listKeyName, JSON.stringify(updatedArray));
    }
}

//! movies...
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



//!user/:id, movie/tvShow/:id
export function getDataById(route, id) {
    axios
        .get(`/${route}/${id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log("you are in get user/media by id catch");
            console.log(error);
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

export const removeFromList = (objId, listCategory, setFunction, listKeyName) => {
    const updatedArrayAfterRemove = [...listCategory].filter(obj => obj.id !== objId);
    setFunction(updatedArrayAfterRemove);
    localStorage.setItem(listKeyName, JSON.stringify(updatedArrayAfterRemove));
    return updatedArrayAfterRemove
}

export const showObjDetails = (dataArray, objId, setFunction, setIsRedirect) => {
    const foundObj = dataArray.find(obj => obj.id === objId);
    setFunction(foundObj);
    setIsRedirect(true);
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
