// routes/complaints.js
const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/newComplaint", async (req, res) => {
  const { fullName, complaint, upiPayment, creditCardPayment, netBankingPayment } = req.body;

  if (!fullName || !complaint) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  try {
    const newComplaint = new Complaint({ fullName, complaint, upiPayment, creditCardPayment, netBankingPayment });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/allComplaint", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
