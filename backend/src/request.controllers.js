import chalk from "chalk";

import { Request } from "./models/Request.js";

export const getRequests = async () => {
  const requests = await Request.find();
  return requests;
};

export const addRequest = async (name, phone, text) => {
  const date_request = new Date().toISOString().split("T")[0];
  await Request.create({
    date_request,
    name,
    phone,
    text,
  });
  console.log(chalk.bgGreen("Request was added!"));
};
