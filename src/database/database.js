import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

