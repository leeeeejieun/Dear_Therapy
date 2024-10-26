const express = require("express");
const router = express.Router();

// 컨트롤러
const userCtrl = require("../controllers/userCtrl");

// 라우터
router.get("/:user_id", userCtrl.checkId);

module.exports = router;