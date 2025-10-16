import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { getRequests, addRequest } from "./request.controllers.js";
import { getStaff, addStaff, loginStaff } from "./staff.controller.js";
// import { auth } from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.post("/requests", async (req, res) => {
  try {
    await addRequest(req.body.name, req.body.phone, req.body.textRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const staff = await loginStaff(req.body.email, req.body.password);
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/requests", async (req, res) => {
  try {
    const requests = await getRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/staffs", async (req, res) => {
  try {
    const staff = await getStaff();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/staffs", async (req, res) => {
  try {
    await addStaff(req.body.email, req.body.password);
  } catch (err) {
    if (err.message.includes("уже существует")) {
      res.status(400).json({ error: err.message });
    } else res.status(500).json({ error: err.message });
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
