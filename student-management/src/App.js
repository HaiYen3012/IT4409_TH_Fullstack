import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // ===================================================================
  // BÀI 1: STATE VÀ LOGIC HIỂN THỊ DANH SÁCH HỌC SINH
  // ===================================================================
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách học sinh từ API khi component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi fetch danh sách:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        setStudents(prev => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
        setSuccessMessage("Thêm học sinh thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        alert("Lỗi khi thêm học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  // ===================================================================
  // BÀI 1: HIỂN THỊ GIAO DIỆN
  // ===================================================================
  
  if (loading) {
    return <div className="App"><h1>Đang tải dữ liệu...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>Lỗi: {error}</h1></div>;
  }

  return (
    <div className="App">
      <h1>Quản Lý Học Sinh</h1>
      
      {/* ============================================================= */}
      {/* BÀI 2: FORM THÊM HỌC SINH MỚI */}
      {/* ============================================================= */}
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

      {/* ============================================================= */}
      {/* BÀI 1: BẢNG DANH SÁCH HỌC SINH */}
      {/* ============================================================= */}
      <div className="student-list">
        <h2>Danh sách học sinh</h2>
        {students.length === 0 ? (
          <p>Chưa có học sinh nào</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Tuổi</th>
                <th>Lớp</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;

