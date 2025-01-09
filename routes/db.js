const mysql = require('mysql');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // MySQL 비밀번호
  database: 'hacking_club', // 사용할 데이터베이스 이름
});

// 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다!');
});

module.exports = db;
