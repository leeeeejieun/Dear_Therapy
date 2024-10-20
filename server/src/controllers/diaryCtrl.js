const Diary = require("../models/diaryModel");
const responseUtils = require("../utils/responseUtils");

const diaryCtrl = {
    create: async (req, res) => {
      try{
        const post = new Diary(req.body, req.file || null);
        const response = await post.create();

        if (response.code === 400 && response.message) {
          return responseUtils.createResponse(res, response); 
        }

        responseUtils.createResponse(res, response );


      } catch(err){
        
        responseUtils.createResponse(res,{code: 500} );
      };
    }
  };

module.exports = diaryCtrl;
