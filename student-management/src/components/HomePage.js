import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddStudent from './AddStudent';
import SearchBar from './SearchBar';
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
    if (!window.confirm(`Bạn có chắc muốn xóa học sinh "${name}"?`)) return;
    
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        setStudents(prevList => prevList.filter(s => s._id !== id));
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  // ===================================================================
  // BÀI 5: TÌM KIẾM HỌC SINH THEO TÊN
  // ===================================================================
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===================================================================
  // HIỂN THỊ GIAO DIỆN
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
      
      {/* BÀI 2: Form thêm học sinh */}
      <AddStudent onStudentAdded={handleStudentAdded} />

      {/* BÀI 5: Tìm kiếm học sinh */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* BÀI 1, 3, 4, 5: Bảng danh sách học sinh */}
      <div className="student-list">
        <h2>Danh sách học sinh</h2>
        {filteredStudents.length === 0 ? (
          <p>{searchTerm ? "Không tìm thấy học sinh nào" : "Chưa có học sinh nào"}</p>
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
              {filteredStudents.map((student) => (
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
