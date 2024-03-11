import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  director: String,
  year: Number,
  ImdbRate: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
