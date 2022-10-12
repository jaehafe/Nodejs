// 모듈
const express = require('express');
const app = express();

// 라우팅
const home = require('./routes/home');

// 앱 세팅
app.set('views', './views');
app.set('view engine', 'ejs');

// /루트 경로로 오면 home으로 보내줌
app.use('/', home); // use = 미들웨어를 등록해주는 메서드

module.exports = app;
