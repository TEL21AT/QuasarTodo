import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: String,
  year: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
