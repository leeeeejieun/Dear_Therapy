const express = require("express");
const multer = require("multer");
const router = express.Router();

// 컨트롤러
const profileCtrl = require("../controllers/profileCtrl");

// 미들웨어
const authToken = require("../middlewares/authToken");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.put("/:user_id", authToken, upload.single("image"), profileCtrl.updateProfile);
router.get("/:user_id", authToken, profileCtrl.getProfile);

module.exports = router;