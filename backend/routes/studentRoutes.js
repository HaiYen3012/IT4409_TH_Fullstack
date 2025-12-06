const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET danh sách học sinh
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
