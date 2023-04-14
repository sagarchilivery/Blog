import userModel from "../models/userModel.js";
import { PasswordHasher, PasswordVerifier } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email: email });
    if (isUserExist) {
      throw new Error("User already exist on this email");
    }

    if (!email) {
      return res.send("Pls enter email");
    }
    if (!password) {
      return res.send("Pls enter password");
    }
    if (!username) {
      return res.send("Pls enter username");
    }

    const newUser = new userModel({
      email: email,
      username: username,
      password: PasswordHasher(password),
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );

    const saveToDB = await newUser.save();
    res.status(201).json({ user: saveToDB, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res.send("Pls enter username");
    }
    if (!password) {
      return res.send("Pls enter password");
    }
    const isUserExist = await userModel.findOne({
      username: username,
    });
    if (!isUserExist) {
      throw new Error("User is not register");
    }
    const isPasswordCorrect = PasswordVerifier(password, isUserExist.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: isUserExist._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );
    res.status(200).json({ user: isUserExist, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
