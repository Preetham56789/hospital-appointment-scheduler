const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =============================
// 📌 BOOK APPOINTMENT (PATIENT)
// =============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;  // ✅ FIXED

    const patientId = req.user.id;

    if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Check slot already booked
    const exists = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      timeSlot,
      status: "booked",
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


// =============================
// 📌 GET MY APPOINTMENTS (PATIENT)
// =============================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    }).populate("doctorId", "name department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// 📌 CANCEL APPOINTMENT
// =============================
router.delete("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// 📌 RESCHEDULE APPOINTMENT
// =============================
router.put("/reschedule/:id", authMiddleware, async (req, res) => {
  try {
    const { date, timeSlot } = req.body;  // ✅ FIXED

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check slot availability
    const exists = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date,
      timeSlot,
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    appointment.date = date;
    appointment.timeSlot = timeSlot;

    await appointment.save();

    res.json({ message: "Appointment rescheduled", appointment });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// 📌 ADMIN - GET ALL APPOINTMENTS
// =============================
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =============================
// 📌 ADMIN DASHBOARD STATS
// =============================
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.countDocuments({ role: "patient" });
    const doctors = await Doctor.countDocuments();
    const appointments = await Appointment.countDocuments();

    const booked = await Appointment.countDocuments({ status: "booked" });
    const cancelled = await Appointment.countDocuments({ status: "cancelled" });

    res.json({
      users,
      doctors,
      appointments,
      booked,
      cancelled,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;