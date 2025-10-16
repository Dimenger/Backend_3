import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  date_request: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  text: { type: String, required: true },
});

export const Request = mongoose.model("Request", RequestSchema);
