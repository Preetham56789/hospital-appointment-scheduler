const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },

  // 🔥 ADD THESE
  phone: String,
  age: Number,
  gender: String,
  address: String,
  specialization: String, // for doctors only
});

module.exports = mongoose.model("User", userSchema);