import express from "express";

import {
  ADD_MOVIE,
  GET_MOVIE_BY_ID,
  UPDATE_MOVIE_BY_ID,
  GET_ALL_MOVIES,
  GET_ALL_SORTED_MOVIES,
  DELETE_MOVIE_BY_ID,
  DELETE_ALL_MOVIES,
} from "../controllers/recommendation.js";

const router = express.Router();

router.post("/movies", ADD_MOVIE);

router.get("/movies/:limit?", GET_ALL_MOVIES);

router.get("/movies/order/des", GET_ALL_SORTED_MOVIES);

router.get("/movies/:id", GET_MOVIE_BY_ID);

router.put("/movies/:id", UPDATE_MOVIE_BY_ID);

router.delete("/movies/:id", DELETE_MOVIE_BY_ID);

router.delete("/movies", DELETE_ALL_MOVIES);

export default router;
