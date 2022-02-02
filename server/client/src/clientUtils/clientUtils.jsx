import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import axios from "axios";
const moviesRoute = "movies",
    tvShowsRoute = "tvShows",
    usersRoute = "users";

export function mainCardsDisplay(str, data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer) {
    const elements = data.map(media =>
        <section key={media.id}>
            <img src={media.posterUrl} alt={media.title} onClick={() => {
                showObjDetails(media.id, data, setMovieDetails, setIsRedirect);
            }} />
            <article className="details" >
                <h2>{media.title}</h2>
                <p>{media.actors}</p>
                <h3>{media.year}</h3>
                <article className="buttonsCont">
                    {str === "tvShows" || str === "movies" ? <>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                    </> : ""}
                    {str === "watchList" ? <>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => removeFromList(media.id, watchList, setWatchList, "watchList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                    </> : ""}
                    {str === "favoritesList" ? <>
                        <button onClick={() => playVideo(data, media.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => addToList(data, media.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
                        <button onClick={() => removeFromList(media.id, favoritesList, setFavoritesList, "favoritesList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                    </> : ""}
                </article>
            </article>
        </section >
    )
    return elements;
}

export function addToList(dataArray, objId, category, setFunction, listKeyName) {
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

    const foundObj = dataArray.find(obj => obj.id == objId);
    if (category.indexOf(foundObj) > -1) {
        alert(`already in your ${listKeyName}`)
    }
    else {
        const updatedArray = [foundObj, ...category];
        setFunction(updatedArray);
        localStorage.setItem(listKeyName, JSON.stringify(updatedArray));
    }
}


export function getDataById(route) {
    axios
        .get(`/${route}/:id`)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log("you are in get media by id catch");
            console.log(error);
        });
}

export const removeFromList = (objId, category, setFunction, listKeyName) => {
    const updatedArrayAfterRemove = [...category].filter(obj => obj.id !== objId);
    setFunction(updatedArrayAfterRemove);
    localStorage.setItem(listKeyName, JSON.stringify(updatedArrayAfterRemove));
    return updatedArrayAfterRemove
}

export const showObjDetails = (objId, dataArray, setFunction, setIsRedirect) => {
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
