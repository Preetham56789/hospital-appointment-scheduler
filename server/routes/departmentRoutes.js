const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const adminMiddleware = require("../middleware/adminMiddleware");

// Add department
router.post("/add", adminMiddleware, async (req, res) => {
  const dept = new Department({ name: req.body.name });
  await dept.save();
  res.json({ message: "Department added" });
});

// Get departments
router.get("/", async (req, res) => {
  const depts = await Department.find();
  res.json(depts);
});

module.exports = router;