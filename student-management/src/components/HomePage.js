import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddStudent from './AddStudent';
import '../App.css';

function HomePage() {
  // ===================================================================
  // BÀI 1: STATE VÀ LOGIC HIỂN THỊ DANH SÁCH HỌC SINH
  // ===================================================================
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm fetch danh sách học sinh
  const fetchStudents = () => {
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
  };

  // Lấy danh sách học sinh khi component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // ===================================================================
  // BÀI 2: XỬ LÝ KHI THÊM HỌC SINH MỚI
  // ===================================================================
  
  const handleStudentAdded = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  };

  // ===================================================================
  // BÀI 3: XỬ LÝ CHỈNH SỬA HỌC SINH
  // ===================================================================
  
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // ===================================================================
  // BÀI 4: XỬ LÝ XÓA HỌC SINH
  // ===================================================================
  
  const handleDelete = (id, name) => {
    // Xác nhận trước khi xóa với tên học sinh
    if (!window.confirm(`Bạn có chắc muốn xóa học sinh "${name}"?`)) return;
    
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        // Xóa học sinh khỏi danh sách trong state
        setStudents(prevList => prevList.filter(s => s._id !== id));
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh: " + (err.response?.data?.error || err.message));
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
      <AddStudent onStudentAdded={handleStudentAdded} />

      {/* ============================================================= */}
      {/* BÀI 1: BẢNG DANH SÁCH HỌC SINH */}
      {/* BÀI 3: THÊM NÚT CHỈNH SỬA */}
      {/* BÀI 4: THÊM NÚT XÓA */}
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(student._id)}
                      className="edit-btn"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(student._id, student.name)}
                      className="delete-btn"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HomePage;
