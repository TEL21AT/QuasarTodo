import express from "express";
import Movie from "../models/Movie.js";
import checkJwt from "../jwt.js";

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Adds a new movie to the list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - director
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: number
 *     responses:
 *       201:
 *         description: Returns the newly created movie
 *       400:
 *         description: Bad request
 */
router.post("/api/movies", checkJwt, async (req, res) => {
  try {
    const movie = new Movie({ userId: req.auth.sub, ...req.body });
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Deletes a movie from the list
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Returns the deleted movie
 *       404:
 *         description: Movie not found
 */
router.delete("/api/movies/:id", checkJwt, async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      userId: req.auth.sub,
    });
    if (!movie) {
      return res.status(404).send();
    }
    res.send({ message: `Movie ${movie.title} deleted` });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieves all movies
 *     responses:
 *       200:
 *         description: Returns all movies
 *       500:
 *         description: Internal server error
 */
router.get("/api/movies", checkJwt, async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.auth.sub });
    res.send(JSON.stringify(movies, null, 2));
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
