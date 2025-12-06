const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// ===================================================================
// BÀI 1: THIẾT LẬP DỰ ÁN & HIỂN THỊ DANH SÁCH HỌC SINH
// ===================================================================

// Middleware: Cho phép CORS và parse JSON
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/student_db')
  .then(() => console.log("Đã kết nối MongoDB thành công"))
  .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// Sử dụng routes API
app.use('/api', studentRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Khởi động server
app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));

// ===================================================================
// BÀI 2: THÊM CHỨC NĂNG THÊM HỌC SINH MỚI
// ===================================================================
// (Sử dụng chung cấu hình từ Bài 1, thêm POST route trong studentRoutes.js)
