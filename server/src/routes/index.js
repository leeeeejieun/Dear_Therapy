const express = require("express");
const router = express.Router();

// 사용자 관련 정보를 처리
const userRoute = require("./users");

router.use("/", userRoute);

module.exports = router;