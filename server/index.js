console.log("app is loading");
const express = require("express");
const app = express(),
  moviesRoute = "movies",
  tvShowsRoute = "tvShows",
  usersRoute = "users",
  {
    getDataById,
    getData,
  } = require('./serverUtils');

app.use(express.json());

app.get(`/${moviesRoute}`, (req, res) => {
  getData(req, res, moviesRoute);
});


app.get(`/${tvShowsRoute}`, (req, res) => {
  getData(req, res, tvShowsRoute);
});

// app.get(`/${moviesRoute}/:id`, (req, res) => {
//   res.send(req.params.id);
// });

// app.get(`/${tvShowsRoute}/:id`, (req, res) => {
//   getDataById(req, res, tvShowsRoute);
// });

app.get(`/${usersRoute}/:id`, (req, res) => {
  getDataById(req, res, usersRoute);
});

app.get(`/${usersRoute}/:id/:watchList`, (req, res) => {
  res.send(req.params);
});

app.patch(`/${usersRoute}/:id/:watchList/:movie_id`, (req, res) => {
  // res.send(req.params);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

