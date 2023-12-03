import express, {  Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongooseError } from "mongoose";
import dotenv from "dotenv";
// import { error } from 'console';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (_, res: Response) => {
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3000;
const URI = process.env.ATLAS_URI;
if (!URI) {
  throw new Error("ATLAS_URI is not defined");
}

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connection established"))
  .catch((error:MongooseError) => console.log("MongoDB connection failed", error.message));
