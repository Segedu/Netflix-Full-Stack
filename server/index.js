console.log("app is loading");
const express = require("express");
const app = express(),
  {
    getData,
  } = require('./serverUtils');


// used for json inside body 
app.use(express.json());


app.get('/movies', (req, res) => {
  // res.send("server works");
  getData(req, res, 'movies');
});

app.get('/tvShows', (req, res) => {
  getData(req, res, 'tvShows');

});

app.get('/users', (req, res) => {
  getData(req, res, "users");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

