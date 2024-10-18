const express = require("express");
const router = express.Router();

const authRoute = require("./auth");   // 사용자 인증 관련 정보를 처리
const diaryRoute = require("./diary"); 

router.use("/", authRoute);
router.use("/diary,", diaryRoute);

module.exports = router;