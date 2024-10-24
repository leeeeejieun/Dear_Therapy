const express = require("express");
const router = express.Router();

// 컨트롤러
const authCtrl = require("../controllers/authCtrl");

// 라우터
router.post("/login", authCtrl.login);
router.post("/tokens", authCtrl.refresh)

module.exports = router;