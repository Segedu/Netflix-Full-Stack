console.log("app is loading");
const express = require("express");
require("dotenv").config();
const app = express(),
  moviesRoute = "movies",
  tvShowsRoute = "tvShows",
  usersRoute = "users",
  popularRoute = "popular",
  topRatedRoute = "topRated",
  {
    deleteMediaItemFromFavoritesById,
    deleteMediaItemFromWatchListById,
    updateUserListById,
    getMediaItemsById,
    getUserDataById,
    getData,
    insertNewUser,
  } = require('./src/serverUtils');

app.use(express.json());

app.get(`/${moviesRoute}`, (req, res) => {
  getData(req, res, moviesRoute);
});

app.get(`/${tvShowsRoute}`, (req, res) => {
  getData(req, res, tvShowsRoute);
});

app.get(`/${popularRoute}`, (req, res) => {
  getData(req, res, popularRoute);
});

app.get(`/${topRatedRoute}`, (req, res) => {
  getData(req, res, topRatedRoute);
});

app.post(`/${usersRoute}`, (req, res) => {
  insertNewUser(req, res, usersRoute)
});

app.get(`/${usersRoute}/:id`, (req, res) => {
  getUserDataById(req, res, usersRoute);
});

app.get(`/${moviesRoute}/:id`, (req, res) => {
  getMediaItemsById(req, res, moviesRoute);
});

app.get(`/${tvShowsRoute}/:id`, (req, res) => {
  getMediaItemsById(req, res, tvShowsRoute);
});

app.patch(`/${usersRoute}/:id`, (req, res) => {
  updateUserListById(req, res, usersRoute);
});

app.patch(`/${usersRoute}/delete/watchList/:id`, (req, res) => {
  deleteMediaItemFromWatchListById(req, res, usersRoute);
})
app.patch(`/${usersRoute}/delete/favoritesList/:id`, (req, res) => {
  deleteMediaItemFromFavoritesById(req, res, usersRoute);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

