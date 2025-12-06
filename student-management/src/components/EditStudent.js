import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function EditStudent() {
  // ===================================================================
  // BÀI 3: STATE VÀ LOGIC CHỈNH SỬA HỌC SINH
  // ===================================================================
  
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Hook để điều hướng
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin học sinh hiện tại khi component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi lấy thông tin học sinh:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Xử lý cập nhật thông tin học sinh
  const handleUpdate = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:5000/api/students/${id}`, {
      name,
      age: Number(age),
      class: stuClass
    })
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        // Quay về trang chủ sau khi cập nhật thành công
        navigate("/");
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Lỗi khi cập nhật học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  if (loading) {
    return <div className="App"><h1>Đang tải dữ liệu...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>Lỗi: {error}</h1></div>;
  }

  return (
    <div className="App">
      <h1>Chỉnh Sửa Học Sinh</h1>
      
      <div className="form-container edit-form">
        <h2>Cập nhật thông tin</h2>
        <form onSubmit={handleUpdate}>
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
          <button type="submit">Cập nhật</button>
          <button 
            type="button" 
            onClick={() => navigate("/")}
            style={{backgroundColor: '#999'}}
          >
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
