import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './screens/Home/Home';
import MyList from './screens/MyList/MyList';
import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Movies from './screens/Movies/Movies';
import TvShows from './screens/TvShows/TvShows';
import Details from './screens/Details/Details';
import VideoPlayer from './screens/VideoPlayer/VideoPlayer';
import netflixLogo from './video/netflix.png.png'
import Chat from './components/Chat/Chat';
import SearchBar from './components/SearchBar/SearchBar';
import { BsChat, BsPersonCircle } from 'react-icons/bs';
import { getData } from './clientUtils/clientUtils';
import style from './App.css';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null),
    [isLoading, setIsLoading] = useState(false),
    [movieDetails, setMovieDetails] = useState(""),
    [movieToPlay, setMovieToPlay] = useState(""),
    [movies, setMovies] = useState([]),
    [tvShows, setTvShows] = useState([]),
    [watchList, setWatchList] = useState([]),
    [favoritesList, setFavoritesList] = useState([]),
    [topRated, setTopRated] = useState([]),
    [popular, setPopular] = useState([]),
    [searchResults, setSearchResults] = useState([]),
    [searchTerm, setSearchTerm] = useState(""),
    [showPreferencesDialog, setShowPreferencesDialog] = useState(true),
    [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    getData('movies', setMovies, setIsLoading);
    getData('tvShows', setTvShows, setIsLoading);
    getData('topRated', setTopRated, setIsLoading);
    getData('popular', setPopular, setIsLoading);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            {auth ? (
              <>
                <Link to="/"><img src={netflixLogo} alt="appLogo" /></Link>
                <Link to="/MyList">My List</Link>
                <Link to="/Movies">Movies</Link>
                <Link to="/TvShows">TV Shows</Link>
                <article><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} setSuggestions={setSuggestions} movies={movies} tvShows={tvShows} /></article>
                <Link to="/Chat"><BsChat className={style.icons} title="Chat" /></Link>
                <p className={style.currentUser}>{auth.email}</p>
                <SignOut setAuth={setAuth} setWatchList={setWatchList} setFavoritesList={setFavoritesList} />
                <Redirect to="/" />
              </>
            ) : <>
              <Link to="/"><img src={netflixLogo} alt="appLogo" /></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TvShows">TV Shows</Link>
              <Link to="/SignIn"><BsPersonCircle className={style.icons} title="SignIn" /></Link>
              <Redirect to="/" />
            </>}
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={() => <Home auth={auth} isLoading={isLoading} searchResults={searchResults} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} tvShows={tvShows} popular={popular} topRated={topRated} />} />
          <Route exact path="/Movies" component={() => <Movies auth={auth} isLoading={isLoading} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} />} />
          <Route exact path="/TvShows" component={() => <TvShows auth={auth} isLoading={isLoading} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} tvShows={tvShows} />} />
          <Route exact path="/Details" component={() => <Details auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} movieDetails={movieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} tvShows={tvShows} />} />
          <Route exact path="/MyList" component={() => <MyList auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} />} />
          <Route exact path="/SignUp" component={() => <SignUp auth={auth} setAuth={setAuth} showPreferencesDialog={showPreferencesDialog} setShowPreferencesDialog={setShowPreferencesDialog} />} />
          <Route exact path="/SignIn" component={() => <SignIn setAuth={setAuth} setWatchList={setWatchList} setFavoritesList={setFavoritesList} />} />
          <Route exact path="/Chat" component={() => <Chat setAuth={setAuth} />} />
          <Route exact path="/VideoPlayer" component={() => <VideoPlayer movieToPlay={movieToPlay} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
