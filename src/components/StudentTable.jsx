import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '16px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm số</th>
          <th>Lớp</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;