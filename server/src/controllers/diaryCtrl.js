const Diary = require("../models/diaryModel");
const responseUtils = require("../utils/responseUtils");

const diaryCtrl = {
    create: async (req, res) => {
      try{
        
        const post = new Diary(req.body, req.file || null);
        const response = await post.create();
        return responseUtils.createResponse(res, response); 
        

        } catch(err){
        responseUtils.createResponse(res,{code: 500} );
      };
    },

     getDiary: async (req, res) => { 
      try {
        
        const { user_id, date } = req.params;
        const diary = new Diary({ user_id, date }, null);
        const response = await diary.lookUp();
        return responseUtils.createResponse(res, response);
        
      } catch (err) {
        responseUtils.createResponse(res,{code: 500});
      }
    },

    updateDiary: async (req, res) => {
      try {
        const { user_id, date } = req.params;
        const { title, content, deleteImage } = req.body;
        const image = req.file || null;
    
        const diary = new Diary({ user_id, date, title, content, deleteImage }, image);
    

        const response = await diary.update();
    
        
        return responseUtils.createResponse(res, response);
      } catch (err) {
        responseUtils.createResponse(res, { code: 500 });
      }
    },
  };

module.exports = diaryCtrl;
