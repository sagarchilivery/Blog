import express from "express";
import {
  createBlog,
  featured,
  getBlogs,
  likeBlog,
  updateBlog,
} from "../controller/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const router = express.Router();

router.get("/getBlogs", getBlogs);
router.get("/getBlog/:id", getBlogs);
router.get("/featured", featured);
router.post("/createBlog", verifyToken, createBlog);
router.put("/updateBlog/:id", verifyToken, updateBlog);
router.put("/likeBlog/:id", verifyToken, likeBlog);
