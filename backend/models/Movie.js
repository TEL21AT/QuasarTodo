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

// create a unique compund index on userId and title
// makes sure that a user can't add the same movie twice
movieSchema.index({ userId: 1, title: 1 }, { unique: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
