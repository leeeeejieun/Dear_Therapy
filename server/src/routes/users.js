const express = require("express");
const router = express.Router();

// 컨트롤러
const userCtrl = require("../controllers/userCtrl");

// 라우터
router.get("/id/:user_id", userCtrl.checkId);
router.get("/email/:email", userCtrl.checkEmail);

module.exports = router;