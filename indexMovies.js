const express = require("express");
const port = 8000;
const app = express();
app.use(express.json());

const movies = [
  {
    id: 0,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 1,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 2,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

app.listen(port, () => console.log(`server is running on port: ${port}`));

app.get("/", (req, res) => {
  console.log("a new request just hit the api ");
  res.send("Message to Client");
});
app.get("/movies", (req, res) => {
  res.send(movies);
});
app.get("/movies/:id", (req, res) => {
  const oneMovie = movies.find((movie) => movie.id === +req.params.id);
  if (oneMovie) {
    res.send(oneMovie);
  } else {
    res.sendStatus(404);
  }
});

app.post("/movies", (req, res) => {
  console.log(req.body);
  res.send("Post route is working 🎉");
});
app.post("/movies", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    `INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)`,
    [title, director, year, color, duration],
    (err, results) => {
      if (err) {
        res.status(500).send("Error saving the movie");
      } else {
        res.status(201).send("Movie successfully saved");
      }
    }
  );
});

//to update
app.put("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const moviePropsToUpdate = req.body;
  connection.query(
    `UPDATE movies SET title="Scarface" WHERE id = "1" `,
    [moviePropsToUpdate, movieId],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a user");
      } else {
        res.status(200).send("post updated successfully 🎉");
      }
    }
  );
});
