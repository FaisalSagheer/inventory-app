import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["admin", "employee"],
      default:"admin"
    },
    password: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
