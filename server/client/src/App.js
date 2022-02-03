import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Home from './screens/Home/Home';
import Logout from './components/LogOut';
import Login from './screens/LogIn/LogIn';
import Register from './screens/Register/Register';
import UserWatchList from './screens/UserWatchList/UserWatchList';
import Movies from './screens/Movies/Movies';
import TvShows from './screens/TvShows/TvShows';
import Details from './screens/Details/Details';
import VideoPlayer from './screens/VideoPlayer/VideoPlayer';
import netflixLogo from './video/netflix.png.png'
import Chat from './components/Chat';
import { getData } from './clientUtils/clientUtils';
import './App.css';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null);
  // const [data, error, isLoading] = useFetch("");
  const [movieDetails, setMovieDetails] = useState("");
  const [movieToPlay, setMovieToPlay] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    getData('movies', setMovies);
    getData('tvShows', setTvShows);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          {auth ? (
            <>
              <Redirect to="UserWatchList" />
              <Link to="/"><img src={netflixLogo} alt="" /></Link>
              <Link to="/UserWatchList">My Watch List <p className='watchListCounter'>{watchList.length ? watchList.length : ""}</p></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TvShows">TV Shows</Link>
              <Link to="/Chat">Chat</Link>
              <Logout setAuth={setAuth} />
            </>
          ) : <Redirect to="/" />}
          {!auth ? (
            <>
              <Link to="/"><img src={netflixLogo} alt="" /></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TvShows">TV Shows</Link>
              <Link to="/LogIn">Login</Link>
              <Link to="/Register">Register</Link>
              <Redirect to="/" />
            </>
          ) : <Redirect to="/" />}
        </nav>
        <Switch>
          <Route exact path="/" component={() => <Home auth={auth} setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} tvShows={tvShows} />} />
          <Route exact path="/Movies" component={() => <Movies setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movies={movies} />} />
          <Route exact path="/TvShows" component={() => <TvShows setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} tvShows={tvShows} />} />
          <Route exact path="/Details" component={() => <Details setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} movieDetails={movieDetails} movies={movies} tvShows={tvShows} />} />
          <Route exact path="/UserWatchList" component={() => <UserWatchList setMovieToPlay={setMovieToPlay} favoritesList={favoritesList} setFavoritesList={setFavoritesList} watchList={watchList} setWatchList={setWatchList} />} />
          <Route exact path="/VideoPlayer" component={() => <VideoPlayer movieToPlay={movieToPlay} />} />
          <Route exact path="/Register" component={() => <Register auth={auth} setAuth={setAuth} />} />
          <Route exact path="/Login" component={() => <Login auth={auth} setAuth={setAuth} />} />
          <Route exact path="/Chat" component={() => <Chat setAuth={setAuth} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
