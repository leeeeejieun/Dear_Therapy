// 모듈
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config();

// 라우팅
const router = require("./src/routes");

// 미들웨어
app.use(cors({
    origin: "*", // 클라이언트 도메인
    credentials: true // 쿠키와 같은 인증 정보를 허용
}));
app.use(morgan('dev'));
app.use(cookieParser());                     
app.use(express.json());     
app.use(express.urlencoded({ extended: false }));  
app.use("/", router); 

module.exports = app;