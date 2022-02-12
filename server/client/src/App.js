import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Home from './screens/Home/Home';
import SignOut from './components/SignOut';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import UserWatchList from './screens/UserWatchList/UserWatchList';
import Movies from './screens/Movies/Movies';
import TvShows from './screens/TvShows/TvShows';
import Details from './screens/Details/Details';
import VideoPlayer from './screens/VideoPlayer/VideoPlayer';
import netflixLogo from './video/netflix.png.png'
import Chat from './components/Chat';
import { getData } from './clientUtils/clientUtils';
import SearchBar from './components/SearchBar';
import { BsChat, BsPersonCircle } from 'react-icons/bs';
// import style from './screens/Home/Home.module.css';
import style from './App.css';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null);
  // const [data, error, isLoading] = useFetch("");
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState("");
  const [movieToPlay, setMovieToPlay] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    getData('movies', setMovies, setIsLoading);
    getData('tvShows', setTvShows, setIsLoading);
    getData('topRated', setTopRated, setIsLoading);
    getData('popular', setPopular, setIsLoading);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          {auth ? (
            <>
              <Redirect to="UserWatchList" />
              <Link to="/"><img src={netflixLogo} alt="" /></Link>
              <Link to="/UserWatchList">My Watch List</Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TvShows">TV Shows</Link>
              <article>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} setSuggestions={setSuggestions} movies={movies} tvShows={tvShows} />
              </article>
              <Link to="/Chat"><BsChat className={style.icons} title="Chat" /></Link>
              <p className={style.currentUser}>{auth.email}</p>
              <SignOut setAuth={setAuth} setWatchList={setWatchList} setFavoritesList={setFavoritesList} />
            </>
          ) : <Redirect to="/" />}
          {!auth ? (
            <>
              <Link to="/"><img src={netflixLogo} alt="appLogo" /></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TvShows">TV Shows</Link>
              <Link to="/SignIn"><BsPersonCircle className={style.icons} title="SignIn" /></Link>
              <Redirect to="/" />
            </>
          ) : <Redirect to="/" />}
        </nav>
        <Switch>
          <Route exact path="/" component={() => <Home auth={auth} isLoading={isLoading} searchResults={searchResults} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} tvShows={tvShows} popular={popular} topRated={topRated} />} />
          <Route exact path="/Movies" component={() => <Movies isLoading={isLoading} auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} />} />
          <Route exact path="/TvShows" component={() => <TvShows isLoading={isLoading} auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} tvShows={tvShows} />} />
          <Route exact path="/Details" component={() => <Details auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movieDetails={movieDetails} movies={movies} tvShows={tvShows} />} />
          <Route exact path="/UserWatchList" component={() => <UserWatchList auth={auth} setMovieDetails={setMovieDetails} setMovieToPlay={setMovieToPlay} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} />} />
          <Route exact path="/VideoPlayer" component={() => <VideoPlayer movieToPlay={movieToPlay} />} />
          <Route exact path="/SignUp" component={() => <SignUp auth={auth} setAuth={setAuth} />} />
          <Route exact path="/SignIn" component={() => <SignIn setWatchList={setWatchList} setFavoritesList={setFavoritesList} setAuth={setAuth} />} />
          <Route exact path="/Chat" component={() => <Chat setAuth={setAuth} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
