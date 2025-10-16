import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constant/constants.js";

import { Staff } from "./models/Staff.js";

export const getStaff = async () => {
  const staff = await Staff.find();
  return staff;
};

export const addStaff = async (email, password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await Staff.create({ email, password: passwordHash });
    console.log(chalk.bgGreen("Staff was added!"));
  } catch (err) {
    throw new Error("Пользователь с таким email уже существует");
  }
};

export const loginStaff = async (email, password) => {
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      throw new Error("Staff is not found!");
    }

    const isPassword = await bcrypt.compare(password, staff.password);
    if (!isPassword) {
      throw new Error("Wrong password!");
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5d" });

    return { staff, token };
  } catch (err) {
    console.error(err, err.message);
  }
};
