import express from "express";
import { login, signup } from "../controller/userController.js";

export const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
