
const s3Utils = require('../utils/s3Utils');
const diaryStorage = require('./diaryStorage');
const responseUtils = require('../utils/responseUtils');

class Diary{
  constructor(body, file){
        this.body = body;
        this.file = file; 
        this.date = body.date;  //date에 공백 포함시 undefined 되니 주의
      }
    
      static isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 정규 표현식
        return regex.test(dateString);
      }
    

  async create() {
    const { user_id, title, content, create_date } = this.body;
    const image = this.file;  

    // content가 없는 경우
    if (!content || content.trim() === "") {
     return {code: 400} 
    }
    // date가 undefined일 경우
    if (!this.date) {
      return { code: 400, message: "날짜가 제공되지 않았습니다." };
    }
    

    //날짜형식이 잘못된 경우
    console.log("Received date:", this.date);
    if (this.date && !Diary.isValidDate(this.date)) {
      return { code: 400, message: "날짜 형식이 잘못되었습니다." };
    }

    const createdAt = this.date;
    const imagePath = image ? await s3Utils.uploadImage("diary_images", image, user_id, createdAt) : null; 
    const diaryInfo = { user_id, title, content, imagePath, created_date: createdAt  };
 
    await diaryStorage.createDiary(diaryInfo); 
    
    return { code: 201 };
  }
  
}

  module.exports = Diary;
