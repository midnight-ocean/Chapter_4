const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config(); 
// middleware
// if there is json body passed with the request
// it creates a body object and attach it to request object
app.use(cors()); 
app.use(express.json());
// use dist folder in the backend 
app.use(express.static("dist")); 
// implement logger middleware
const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.path}`);
  console.log("Request Body:", req.body);
  console.log("----------------------------");
  // dont forget to call next method like mr.sen
  next();
};
app.use(reqLogger);
console.log("Reading from env", process.env.PORT)

const port = process.env.PORT || 3001;

let movies = [
  { id: 1, title: "Inception", watchlist: true },
  { id: 2, title: "The Matrix", watchlist: false },
  { id: 3, title: "Interstellar", watchlist: true },
  { id: 4, title: "The Dark Knight", watchlist: false },
  { id: 5, title: "Pulp Fiction", watchlist: true },
  { id: 6, title: "Forrest Gump", watchlist: false },
  {
    id: 7,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    watchlist: true,
  },
  { id: 8, title: "The Shawshank Redemption", watchlist: false },
  { id: 9, title: "Gladiator", watchlist: true },
  { id: 10, title: "Titanic", watchlist: false },
];

app.get("/", (req, res) => {
  res.send("Hello From Express Server!");
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((m) => m.id == id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  console.log("Passed Id: ", id);
  // find method
  const movie = movies.find((m) => m.id == id);
  if (movie) {
    movies = movies.filter((m) => m.id != id);
    res.json({ message: `The movie [${movie.title}] is removed` });
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.post("/api/movies", (req, res) => {
  const { title, watchlist } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const movie = {
    id: Date.now(),
    title,
    watchlist: watchlist || false,
  };

  movies.push(movie);
  res.status(201).json(movie);
  // const bodyObject = req.body;

  // const id = Date.now();
  // const title = bodyObject.title;
  // const watchlist = bodyObject.watchlist;

  // if(title) {
  //   const newMovie = {
  //     title: title,
  //     watchlist: watchlist || false,
  //     id: id
  //   }

  //   movies.push(newMovie);
  //   res.json(newMovie);
  // } else {
  //   res.status(400).json({message:"Title is required"})
  // }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
