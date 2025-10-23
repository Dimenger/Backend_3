import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./jwt-secret.js";

import { User } from "./models/User.js";

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email is not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Wrong password!");
    }
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "5d" });
  } catch (error) {
    throw error; /* выкинет ошибку наружу*/
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: passwordHash,
  });
  console.log(chalk.bgGreen("User was added!"));
};
