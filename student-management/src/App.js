import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="App"><h1>Đang tải dữ liệu...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>Lỗi: {error}</h1></div>;
  }

  return (
    <div className="App">
      <h1>Danh sách học sinh</h1>
      {students.length === 0 ? (
        <p>Chưa có học sinh nào</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{margin: '0 auto', borderCollapse: 'collapse'}}>
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
  );
}

export default App;

