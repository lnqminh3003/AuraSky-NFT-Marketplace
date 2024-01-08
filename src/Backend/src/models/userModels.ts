import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  address: { type: String },
});

export default mongoose.model("Users", userSchema);
