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

// ===================================================================
// BÀI 3: API CHỈNH SỬA THÔNG TIN HỌC SINH
// ===================================================================

// GET /api/students/:id - Lấy thông tin 1 học sinh theo ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:id - Cập nhật thông tin học sinh
router.put('/students/:id', async (req, res) => {
  try {
    // Tìm và cập nhật học sinh theo ID
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Trả về document sau khi update
    );
    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===================================================================
// BÀI 4: API XÓA HỌC SINH
// ===================================================================

// DELETE /api/students/:id - Xóa học sinh
router.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Đã xóa học sinh", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
