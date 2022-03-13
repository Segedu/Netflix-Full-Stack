import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Preferences from './components/Preferences/Preferences';
import SearchBar from './components/SearchBar/SearchBar';
import SignOut from './components/SignOut/SignOut';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Chat from './components/Chat/Chat';
import Home from './screens/Home/Home';
import MyList from './screens/MyList/MyList';
import Movies from './screens/Movies/Movies';
import TvShows from './screens/TvShows/TvShows';
import Details from './screens/Details/Details';
import VideoPlayer from './screens/VideoPlayer/VideoPlayer';
import netflixLogo from './video/netflix.png.png'
import { BsChat, BsPersonCircle } from 'react-icons/bs';
import { getData } from './clientUtils/clientUtils';
import Context from './components/context';
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
    [preferences, setPreferences] = useState([]),
    [topRated, setTopRated] = useState([]),
    [popular, setPopular] = useState([]),
    [searchResults, setSearchResults] = useState([]),
    [searchTerm, setSearchTerm] = useState(""),
    [suggestions, setSuggestions] = useState(""),
     [showPreferencesDialog, setShowPreferencesDialog] = useState();


  useEffect(() => {
    getData('movies', setMovies, setIsLoading);
    getData('tvShows', setTvShows, setIsLoading);
    getData('topRated', setTopRated, setIsLoading);
    getData('popular', setPopular, setIsLoading);
  }, []);

  return (
    <Context.Provider value={{
      auth, isLoading, movies, tvShows, watchList, favoritesList, preferences, movieDetails, movieToPlay, searchTerm, suggestions, topRated, popular, searchResults,showPreferencesDialog, setShowPreferencesDialog,
      setPreferences, setSuggestions, setSearchTerm, setSearchResults, setMovieDetails, setMovieToPlay, setWatchList, setFavoritesList, setAuth
    }}>
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
                  <article><SearchBar /></article>
                  <Link to="/Chat"><BsChat className={style.icons} title="Chat" /></Link>
                  <p className={style.currentUser}>{auth.email}</p>
                  <SignOut />
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
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/Movies" component={() => <Movies />} />
            <Route exact path="/TvShows" component={() => <TvShows />} />
            <Route exact path="/Details" component={() => <Details />} />
            <Route exact path="/MyList" component={() => <MyList />} />
            <Route exact path="/SignUp" component={() => <SignUp />} />
            <Route exact path="/SignIn" component={() => <SignIn />} />
            <Route exact path="/Chat" component={() => <Chat />} />
            <Route exact path="/VideoPlayer" component={() => <VideoPlayer />} />
          </Switch>
        </div>
      </BrowserRouter >
    </Context.Provider>
  )
}

export default App;
