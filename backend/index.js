import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as blogRoutes } from "./routes/blogRoutes.js";
// import "dotenv/config.js";

dotenv.config();
const app = express();
app.use(express.json());

const db = process.env.DB_URI;
const port = process.env.PORT;

try {
  mongoose.connect(db, { dbName: "BlogDB" });
  console.log("DB connected succesfully");
} catch (error) {
  console.log(error);
}

app.use("/api/auth", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Server started successfully ${port}`);
});
