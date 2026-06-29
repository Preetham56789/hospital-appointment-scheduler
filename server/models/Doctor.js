const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    required: true,
  },

  isApproved: {
    type: Boolean,
    default: true,
  },

  availableSlots: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);