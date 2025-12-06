// ===================================================================
// BÀI 4: COMPONENT XÓA HỌC SINH
// ===================================================================

import axios from 'axios';

function DeleteButton({ studentId, studentName, onStudentDeleted }) {
  const handleDelete = () => {
    // Xác nhận trước khi xóa
    if (!window.confirm(`Bạn có chắc muốn xóa học sinh "${studentName}"?`)) return;
    
    axios.delete(`http://localhost:5000/api/students/${studentId}`)
      .then(res => {
        console.log(res.data.message);
        // Gọi callback để cập nhật danh sách ở component cha
        onStudentDeleted(studentId);
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Xóa
    </button>
  );
}

export default DeleteButton;
