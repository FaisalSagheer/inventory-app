
import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, minlength: 10 },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee"],
      default: "employee"
    },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
  });

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;
