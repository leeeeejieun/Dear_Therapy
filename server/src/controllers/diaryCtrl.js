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

     getDiaryByDate: async (req, res) => {
      try {
        
        const { user_id, date } = req.params;
        
        console.log(`user_id: ${user_id}, date: ${date}`);
        const result = await Diary.findDiaryByUserAndDate(user_id, date);
  

        responseUtils.createResponse(res, {
          code: 200,
          data: {
            diary: { title: result.data.title, content: result.data.content, image: result.data.imageUrl || null},
            recommendation: { comment: null },
          },
        });
  
        
      } catch (err) {
        responseUtils.createResponse(res, { code: 500});
      }
    },
    
  };

module.exports = diaryCtrl;
