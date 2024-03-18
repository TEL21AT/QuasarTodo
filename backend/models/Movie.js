import mongoose from "mongoose";

// Für mehr paramter eines Films müssen diese hier hinzugefügt werden
// Für Infos schau hier: https://mongoosejs.com/docs/schematypes.html
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
  language: Array,
});

// create a unique compund index on userId and title
// makes sure that a user can't add the same movie twice
movieSchema.index({ userId: 1, title: 1 }, { unique: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
