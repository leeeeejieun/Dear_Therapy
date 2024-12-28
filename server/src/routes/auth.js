const express = require("express");
const router = express.Router();

// 컨트롤러
const authCtrl = require("../controllers/authCtrl");

// JWT 미들웨어
const authToken = require("../middlewares/authToken");

// 라우터
router.post("/login", authCtrl.login);
router.post("/login/kakao/:code", authCtrl.kakaoLogin);
router.post("/tokens", authCtrl.refresh)
router.delete("/logout", authToken, authCtrl.logout);

module.exports = router;