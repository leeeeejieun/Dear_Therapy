const express = require("express");
const router = express.Router();

// 컨트롤러
const userCtrl = require("../controllers/userCtrl");

// 미들웨어
const authToken = require("../middlewares/authToken");

// 라우터
router.post("/", userCtrl.signUp);
router.delete("/:user_id", authToken, userCtrl.withdraw);
router.get("/id/:user_id", userCtrl.checkId);
router.get("/email/:email", userCtrl.checkEmail);

module.exports = router;