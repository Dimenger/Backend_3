import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
});

export const Request = mongoose.model("Request", RequestSchema);
