const express = require("express");
const router = express.Router();

// 컨트롤러
const analysisCtrl = require("../controllers/analysisCtrl");

// JWT 미들웨어
const authToken = require("../middlewares/authToken");

// 라우터
router.post("/:user_id/:date", authToken, analysisCtrl.analysis);
router.get("/:user_id/:date", authToken, analysisCtrl.recommend);
router.get("/month/:user_id/:date", authToken, analysisCtrl.emotion);

module.exports = router;
