const express = require("express");

const router = express.Router();

const Doctor = require("../models/Doctor");


// GET ALL DOCTORS
router.get("/", async (req, res) => {

  try {

    const doctors = await Doctor.find();

    res.json(doctors);

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
});


// ADD DOCTOR
router.post("/add", async (req, res) => {

  try {

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.json(doctor);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Doctor add failed",
    });
  }
});

module.exports = router;