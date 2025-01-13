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
        const diary = new Diary({ user_id, date });
        const response = await diary.lookUp();
        return responseUtils.createResponse(res, response);
        
      } catch (err) {
        responseUtils.createResponse(res,{code: 500});
      }
    },

    updateDiary: async (req, res) => {
      try {
        const { user_id, date } = req.params;
        const { title, content } = req.body;
        const  image  = req.file ? req.file : req.body.image;
       
        const diary = new Diary({ user_id, date, title, content }, image);
    
        const response = await diary.update();
    
        return responseUtils.createResponse(res, response);
      } catch (err) {
        responseUtils.createResponse(res, { code: 500 });
      }
    },

    deleteDiary: async (req, res) => {
      try {
        const { user_id, date } = req.params;
        
        const diary = new Diary({ user_id, date });
        const response = await diary.delete();
  
        return responseUtils.createResponse(res, response);
      } catch (err) {
        return responseUtils.createResponse(res, { code: 500});
      }
    },
  };

module.exports = diaryCtrl;
