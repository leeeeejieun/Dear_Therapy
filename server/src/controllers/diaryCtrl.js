const Diary = require("../models/diaryModel");
const s3Util = require('../utils/s3Util');
const responseUtils = require("../utils/responseUtils");

const diaryCtrl = {
  process: {
    create: async (req, res) => {
      try{
        const post = new Diary(req.body, req.file);
        const response = await post.create();
        res.status(response.code).end();

      } catch(err){
        console.error(err); //발생한 에러를 콘솔에 로그로 기록
        res.status(500).json({message:"오류가 발생했습니다."});
      };
    }
  }

};

module.exports = diaryCtrl;
