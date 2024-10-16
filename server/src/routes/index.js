const express = require("express");
const router = express.Router();

const authRoute = require("./auth");   // 사용자 인증 관련 정보를 처리

router.use("/", authRoute);

module.exports = router;