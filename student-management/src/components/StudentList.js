// ===================================================================
// BÀI 1, 3, 4, 5, 6: COMPONENT HIỂN THỊ BẢNG DANH SÁCH HỌC SINH
// ===================================================================

import DeleteButton from './DeleteButton';

function StudentList({ students, onEdit, onDelete, searchTerm }) {
  return (
    <div className="student-list">
      <h2>Danh sách học sinh</h2>
      {students.length === 0 ? (
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
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <button 
                    onClick={() => onEdit(student._id)}
                    className="edit-btn"
                  >
                    Sửa
                  </button>
                  <DeleteButton 
                    studentId={student._id}
                    studentName={student.name}
                    onStudentDeleted={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
