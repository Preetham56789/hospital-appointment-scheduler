const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  availableSlots: [
    {
      type: String
    }
  ],
  isApproved: {
  type: Boolean,
  default: false
}
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);