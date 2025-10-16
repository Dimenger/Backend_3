import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export const Staff = mongoose.model("Staff", StaffSchema);
