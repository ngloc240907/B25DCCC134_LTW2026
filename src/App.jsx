import { useState } from 'react';
import StudentTable from './components/StudentTable';

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Đức Lộc', score: 9.0, class: 'D25CQCC01' },
    { id: 2, name: 'Trần Thị B', score: 6.5, class: 'D25CQCC01' },
    { id: 3, name: 'Lê Văn C', score: 4.0, class: 'D25CQCC02' },
  ]);

  const [formData, setFormData] = useState({ name: '', score: '', studentClass: '' });
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState('');

  const { name, score, studentClass } = formData;

  const handleInputChange = (e) => {
    const { name: fieldName, value } = e.target;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const numericScore = parseFloat(score);

    if (!name.trim() || score === '' || !studentClass.trim()) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setError('Điểm số không hợp lệ (phải từ 0 đến 10)!');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numericScore,
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);
    setFormData({ name: '', score: '', studentClass: '' });
    setError('');
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter(({ score }) => {
    if (filter === 'GOOD') return score >= 8;
    if (filter === 'FAIL') return score < 5;
    return true;
  });

  const totalStudents = students.length;
  const averageScore =
    totalStudents > 0
      ? (students.reduce((sum, { score }) => sum + score, 0) / totalStudents).toFixed(2)
      : 0;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>{`Quản lý Điểm Sinh viên`}</h1>

      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={name}
          onChange={handleInputChange}
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          type="number"
          step="0.1"
          name="score"
          placeholder="Điểm số"
          value={score}
          onChange={handleInputChange}
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input
          type="text"
          name="studentClass"
          placeholder="Lớp"
          value={studentClass}
          onChange={handleInputChange}
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 12px' }}>Thêm</button>
      </form>

      {error && <p style={{ color: 'red' }}>{`${error}`}</p>}

      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setFilter('ALL')} style={{ marginRight: '8px' }}>
          Tất cả
        </button>
        <button onClick={() => setFilter('GOOD')} style={{ marginRight: '8px' }}>
          Sinh viên Giỏi (&gt;= 8)
        </button>
        <button onClick={() => setFilter('FAIL')}>
          Sinh viên Trượt (&lt; 5)
        </button>
      </div>

      <div>
        <p>{`Tổng số lượng sinh viên: ${totalStudents} | Điểm trung bình toàn lớp: ${averageScore}`}</p>
      </div>

      <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;