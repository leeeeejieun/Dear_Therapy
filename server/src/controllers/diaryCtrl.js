const Diary = require("../models/diaryModel");
const responseUtils = require("../utils/responseUtils");

const diaryCtrl = {
  process: {
    create: async (req, res) => {
      try{
        const post = new Diary(req.body, req.file || null);
        const response = await post.create();
        responseUtils.createResponse(res, { code: 500 });


      } catch(err){
        responseUtils.createResponse(res, resoonse);
      };
    }
  }

};

module.exports = diaryCtrl;
