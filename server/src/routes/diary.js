//다이어리 관련 API 작성
const express = require("express");
const multer = require("multer");
const router = express.Router();



const diaryCtrl = require("../controllers/diaryCtrl");

const storage = multer.memoryStorage(); //메모리에 파일 저장
const upload = multer({storage: storage}); //multer 설정
router.post("/", upload.single("image"), diaryCtrl.create );
router.get('/:user_id/:date', diaryCtrl.getDiary);

module.exports = router;