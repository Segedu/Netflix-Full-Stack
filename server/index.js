console.log("app is loading");
const express = require("express");
const app = express(),
  moviesRoute = "movies",
  tvShowsRoute = "tvShows",
  usersRoute = "users",
  {
    updateUserListById,
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

app.post(`/${usersRoute}`, (req, res) => {
  insertNewUser(req, res, usersRoute)
});

app.get(`/${usersRoute}/:id`, (req, res) => {
  getUserDataById(req, res, usersRoute);
});

// app.get(`/${moviesRoute}/:id`, (req, res) => {
//   getUserDataById(req, res, tvShowsRoute);
// });

// app.get(`/${tvShowsRoute}/:id`, (req, res) => {
//   getUserDataById(req, res, tvShowsRoute);
// });

app.patch(`/${usersRoute}/:id`, (req, res) => {
  updateUserListById(req, res, usersRoute)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

