import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "A simple Express Movie API",
    },
  },
  apis: ["./routes/*.js"], // paths to the API docs
};

// add swagger UI
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// use the movieRoutes
app.use(movieRoutes);

// custom exception handler
app.use((error, req, res, next) => {
  res.status(error.status).json({
    name: error.name,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
