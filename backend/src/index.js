import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { addRequest, getRequests } from "./request.controllers.js";
import { addUser, loginUser, getUsers } from "./user.controller.js";
import { auth } from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.post("/request", async (req, res) => {
  try {
    await addRequest(req.body);
    res.json({ message: "Request was added!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, message: "Пользователь вошел!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /*В случае ошибок loginUser — мы делаем throw error, 
  чтобы в маршруте его поймать и вернуть статус 400 и JSON с ошибкой.
  В случае успеха — возвращаем JSON с флагом успеха.*/
});

app.use(auth);

app.get("/auth/me", async (req, res) => {
  // req.user — это результат jwt.verify
  res.json({ authorized: false });
});

app.get("/request", async (req, res) => {
  try {
    res.json(await getRequests());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    res.json(await getUsers());
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const token = "";
    res.cookie("token", token, { httpOnly: true });
    res.json("Пользователь вышел!");
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.json({ message: "User was added!" });
  } catch (err) {
    if (err === 11000) {
      res.status(11000).json("The email already exists!");
    }
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server start on port ${PORT}!`));
    });
  })
  .catch((err) => {
    console.error(err);
  });
