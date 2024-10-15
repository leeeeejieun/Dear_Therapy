const express = require("express");
const router = express.Router();

// 컨트롤러
const userCtrl = require("../controllers/userCtrl");

// 라우터
router.post("/login", userCtrl.login);


module.exports = router;