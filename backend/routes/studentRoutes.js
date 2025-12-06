const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ===================================================================
// BÀI 1: API LẤY DANH SÁCH HỌC SINH
// ===================================================================

// GET /api/students - Lấy danh sách tất cả học sinh
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================================
// BÀI 2: API THÊM HỌC SINH MỚI
// ===================================================================

// POST /api/students - Thêm học sinh mới
router.post('/students', async (req, res) => {
  try {
    // Tạo học sinh mới từ dữ liệu gửi lên
    const newStudent = await Student.create(req.body);
    // Trả về học sinh vừa tạo với mã 201
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
