import { useState } from 'react';
import axios from 'axios';
import '../App.css';

function AddStudent({ onStudentAdded }) {
  // ===================================================================
  // BÀI 2: STATE VÀ LOGIC THÊM HỌC SINH MỚI
  // ===================================================================
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Xử lý submit form thêm học sinh
  const handleAddStudent = (e) => {
    e.preventDefault();
    
    const newStu = { 
      name, 
      age: Number(age), 
      class: stuClass 
    };
    
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        
        // Gọi callback để cập nhật danh sách ở HomePage
        if (onStudentAdded) {
          onStudentAdded(res.data);
        }
        
        // Xóa nội dung form sau khi thêm thành công
        setName("");
        setAge("");
        setStuClass("");
        
        // Hiển thị thông báo thành công
        setSuccessMessage("Thêm học sinh thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        alert("Lỗi khi thêm học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  return (
    <div className="form-container">
      <h2>Thêm Học Sinh Mới</h2>
      <form onSubmit={handleAddStudent}>
        <input 
          type="text" 
          placeholder="Họ tên" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Tuổi" 
          value={age} 
          onChange={e => setAge(e.target.value)} 
          required 
          min="1"
          max="100"
        />
        <input 
          type="text" 
          placeholder="Lớp" 
          value={stuClass} 
          onChange={e => setStuClass(e.target.value)} 
          required 
        />
        <button type="submit">Thêm học sinh</button>
      </form>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
}

export default AddStudent;
