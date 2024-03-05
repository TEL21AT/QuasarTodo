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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// use the movieRoutes
app.use(movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
