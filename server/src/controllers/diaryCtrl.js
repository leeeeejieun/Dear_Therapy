const Diary = require("../models/diaryModel");
const responseUtils = require("../utils/responseUtils");

const diaryCtrl = {
  process: {
    create: async (req, res) => {
      try{
        const post = new Diary(req.body, req.file || null);
        const response = await post.create();
        responseUtils.createResponse(res, response);


      } catch(err){
        console.error("Error occurred:", err);
        responseUtils.createResponse(res, { code: 500, message: "서버 오류 발생" });
      };
    }
  }

};

module.exports = diaryCtrl;
