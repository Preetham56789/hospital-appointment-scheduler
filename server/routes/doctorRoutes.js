const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const adminMiddleware = require("../middleware/adminMiddleware");

// ➕ Add Doctor (admin)
router.post("/add", adminMiddleware, async (req, res) => {
  try {
    const doctor = new Doctor({
      ...req.body,
      isApproved: false
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor added, pending approval" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📋 Get all approved doctors (for users)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true });
    res.json(doctors);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔍 Get doctors by department
router.get("/department/:dept", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      department: req.params.dept,
      isApproved: true
    });

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Approve doctor (admin)
router.put("/approve/:id", adminMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({ message: "Doctor approved", doctor });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ❌ Reject doctor (admin)
router.delete("/reject/:id", adminMiddleware, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: "Doctor rejected and removed" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✏️ Update doctor (admin)
router.put("/update/:id", adminMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(doctor);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🗑 Delete doctor (admin)
router.delete("/delete/:id", adminMiddleware, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ message: "Doctor deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;