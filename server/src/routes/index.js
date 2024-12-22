const express = require("express");
const router = express.Router();

const authRoute = require("./auth");   // 인증 관련 기능을 처리
const userRoute = require("./users");  // 사용자 관련 정보를 처리 
const diaryRoute = require("./diary"); 
const analysisRoute = require("./analysis");
const profileRoute = require("./profile");

router.use("/", authRoute);
router.use("/users", userRoute)
router.use("/diary", diaryRoute);
router.use("/analysis", analysisRoute);
router.use("/profile", profileRoute);

module.exports = router;