const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db'); // MySQL 연결 모듈 가져오기
const jwt = require('jsonwebtoken'); // jwt 위해서 모듈 가져옴 
require('dotenv').config();
// jwt 용 비밀 키 추후에 환경변수로 옮겨야 함. 

const SECRET_KEY = process.env.SECRET_KEY; 

// 게시글 목록 (샘플 데이터)
const posts = [
    {
        id: 2958,
        category: '설문',
        title: 'aaaaaaaaaaaaaaa?',
        author: '운영자',
        date: '24/12/16',
        views: 10,
        likes: 0,
    },
    {
        id: 2857,
        category: 'AD',
        title: '[bbbbbbbbbbbbbbbbbbbbbbbbb',
        author: '운영자',
        date: '24/12/11',
        views: 18,
        likes: 0,
    },
    // 더 많은 게시글을 여기에 추가
];

// 게시판 목록 페이지 렌더링
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views', 'board.html'));
});

// 게시글 데이터 전달
router.get('/list', (req, res) => {
    res.json(posts); // JSON 형식으로 게시글 목록 반환
});

// 게시글 상세보기
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.id === postId);

    if (post) {
        res.json(post); // 게시글 데이터 반환
    } else {
        res.status(404).send('게시글을 찾을 수 없습니다.');
    }
});

// 게시글 작성 (예제)
router.post('/write', (req, res) => {
    const { title, category, author } = req.body;

    if (title && category && author) {
        const newPost = {
            id: posts.length + 1,
            category,
            title,
            author,
            date: new Date().toISOString().slice(0, 10),
            views: 0,
            likes: 0,
        };
        posts.push(newPost);
        res.json({ success: true, post: newPost });
    } else {
        res.status(400).json({ success: false, message: '모든 필드를 입력하세요.' });
    }
});

module.exports = router;
