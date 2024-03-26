import casual from "casual";

let recommendations = [];

const ADD_MOVIE = (req, res) => {
  const generatedId = casual.uuid;

  const isIdExists = recommendations.some((rec) => rec.id === generatedId);

  if (isIdExists) {
    return res.status(409).json({ error: "Movie with this ID already exists" });
  }

  const recommendation = {
    id: generatedId,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    imdbLink: req.body.imdbLink,
  };

  recommendations.push(recommendation);

  return res.status(201).json({ recommendation: recommendation });
};

const GET_MOVIE_BY_ID = (req, res) => {
  const recommendation = recommendations.find(
    (rec) => rec.id === req.params.id
  );

  if (!recommendation) {
    return res.status(400).json({
      message:
        "The entered ID does not exist. Please try entering a different ID.",
    });
  }

  return res.json(recommendation);
};

const UPDATE_MOVIE_BY_ID = (req, res) => {
  const isRecommendationExists = recommendations.some(
    (movie) => movie.id === req.params.id
  );

  if (!isRecommendationExists) {
    return res
      .status(404)
      .json({ message: `Movie with id ${req.params.id} was not found` });
  }

  const index = recommendations.findIndex((movie) => {
    return movie.id === req.params.id;
  });

  console.log(req.body);

  recommendations[index] = { ...recommendations[index], ...req.body };

  return res.json({ updatedRecommendation: recommendations[index] });
};

const GET_ALL_MOVIES = (req, res) => {
  const defaultLimit = 10;
  const limit = req.params.limit || defaultLimit;
  const movies = recommendations.slice(0, limit);

  if (!recommendations.length) {
    return res.status(200).json({ message: "Data not exist" });
  }

  return res.json(movies);
};

const GET_ALL_SORTED_MOVIES = (req, res) => {
  if (!recommendations.length) {
    return res.status(200).json({ message: "Data not exist" });
  }

  const sortedRecommendation = recommendations.sort(
    (a, b) => b.rating - a.rating
  );

  return res.json(sortedRecommendation);
};

const DELETE_MOVIE_BY_ID = (req, res) => {
  const remainingMovies = recommendations.filter((movie) => {
    return req.params.id !== movie.id;
  });

  const isRecommendationExists = recommendations.some(
    (movie) => movie.id === req.params.id
  );

  if (!isRecommendationExists) {
    return res
      .status(404)
      .json({ message: `Movie with id ${req.params.id} was not found` });
  }

  recommendations = remainingMovies;

  return res
    .status(200)
    .json({ message: `Movie with id: ${req.params.id} was deleted` });
};

const DELETE_ALL_MOVIES = (req, res) => {
  recommendations = []; // another method is recommendations.length = 0 (no need to change from const to let)
  return res.json({
    message: "All movie recommendations deleted successfully",
  });
};

export {
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  UPDATE_MOVIE_BY_ID,
  GET_ALL_MOVIES,
  GET_ALL_SORTED_MOVIES,
  DELETE_MOVIE_BY_ID,
  DELETE_ALL_MOVIES,
};
