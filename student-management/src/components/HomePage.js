import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddStudent from './AddStudent';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import StudentList from './StudentList';
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
  // BÀI 4: XỪC LÝ XÓA HỌC SINH
  // ===================================================================
  const handleDelete = (id) => {
    // Xóa học sinh khỏi danh sách trong state
    setStudents(prevList => prevList.filter(s => s._id !== id));
  };

  // ===================================================================
  // BÀI 5: TÌM KIẾM HỌC SINH THEO TÊN
  // ===================================================================
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===================================================================
  // BÀI 6: SẮP XẾP DANH SÁCH HỌC SINH THEO TÊN
  // ===================================================================
  const [sortAsc, setSortAsc] = useState(true);
  
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return sortAsc ? -1 : 1;
    if (nameA > nameB) return sortAsc ? 1 : -1;
    return 0;
  });

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

      {/* BÀI 6: Sắp xếp học sinh */}
      <SortButton sortAsc={sortAsc} setSortAsc={setSortAsc} />

      {/* BÀI 1, 3, 4, 5, 6: Bảng danh sách học sinh */}
      <StudentList 
        students={sortedStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default HomePage;
