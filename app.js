const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const ejs = require('ejs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; 

//라우트 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// .html 파일을 EJS로 렌더링 ejs확장자 사용하기 싫어..
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // 기본 템플릿 확장자를 .html로 설정
app.set('views', path.join(__dirname, 'views')); // 템플릿 파일 경로 설정

//index 페이지 
app.get('/', (req, res) => {
    let Sucess = false; 
    const token = req.cookies?.jwt_token; // 안전하게 쿠키에서 토큰 읽기
    console.log(token)
       
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
        console.log("no jwt");
        return res.render('index', { Sucess });
    }
    
    // 토큰 검증    
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('JWT 검증 실패:', err); // 디버깅 로그
            return res.render('index', { Sucess });
        }
    
        // 토큰이 유효하면 메인 페이지로 리다이렉트    
        console.log('유효한 토큰:', user); // 디버깅 로그
        Sucess = true;
        return res.render('index', { Sucess });
    });
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// 로그인, 로그아웃, 회원가입 기능
const authRoutes = require('./routes/auth/auth');
app.use('/auth', authRoutes); 


// 게시판 기능
const boardRoutes = require('./routes/board/board');
app.use('/board', boardRoutes); 



// 프로젝트 설명 기능
const projectRoutes = require('./routes/project/project');
app.use('/project', projectRoutes); 


// 동아리 설명 기능
const aboutRoutes = require('./routes/about/about');
app.use('/about', aboutRoutes); 


// 세미나 설명 기능
const seminarRoutes = require('./routes/seminar/seminar');
app.use('/seminar', seminarRoutes); 


// admin 기능
const adminRoutes = require('./routes/admin/admin');
app.use('/admin', adminRoutes); 