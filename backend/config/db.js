import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection to MongoDB failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
