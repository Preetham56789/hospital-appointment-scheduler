const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ GET ALL APPOINTMENTS OF LOGGED USER
router.get("/", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "name department experience")
      .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
});


// ✅ BOOK APPOINTMENT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    // ❌ Validation
    if (!doctor || !date || !time) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Check slot already booked
    const existingAppointment = await Appointment.findOne({
      doctor,
      time,
      status: "booked",
      date: new Date(date),
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    // ✅ Create appointment
    const appointment = new Appointment({
      patient: req.user._id,
      doctor,
      date: new Date(date),
      time,
      status: "booked",
    });

    await appointment.save();

    // ✅ Populate doctor details
    const populatedAppointment = await Appointment.findById(
      appointment._id
    ).populate("doctor", "name department experience");

    res.status(201).json(populatedAppointment);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Booking failed",
    });
  }
});


// ✅ CANCEL APPOINTMENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // ✅ Only owner can cancel
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cancel failed",
    });
  }
});

// UPDATE STATUS
router.put("/:id/status", async (req, res) => {
  try {

    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(appointment);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Status update failed",
    });
  }
});

module.exports = router;