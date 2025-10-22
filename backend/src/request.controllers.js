import chalk from "chalk";

import { Request } from "./models/Request.js";

export const getRequests = async () => {
  const requests = await Request.find();
  return requests;
};

export const addRequest = async (data) => {
  await Request.create({
    date: data.date,
    time: data.time,
    name: data.name,
    phone: data.phone,
    description: data.description,
  });
  console.log(chalk.bgGreen("Request was added!"));
};
