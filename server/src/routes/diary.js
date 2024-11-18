//다이어리 관련 API 작성
const express = require("express");
const multer = require("multer");
const router = express.Router();



const diaryCtrl = require("../controllers/diaryCtrl");

const storage = multer.memoryStorage(); //메모리에 파일 저장
const upload = multer({storage: storage}); //multer 설정
router.post("/", upload.single("image"), diaryCtrl.create );
router.get('/:user_id/:date', diaryCtrl.getDiary);

// JWT 미들웨어
const authToken = require("../middlewares/authToken");

// 라우터
router.post("/login", authCtrl.login);
router.post("/tokens", authCtrl.refresh)
router.delete("/logout", authToken, authCtrl.logout);

module.exports = router;