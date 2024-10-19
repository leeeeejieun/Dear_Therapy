
const s3Utils = require('../utils/s3Utils');
const diaryStorage = require('./diaryStorage');
const responseUtils = require('../utils/responseUtils');

class Diary{
  constructor(body, file){
        this.body = body;
        this.file = file; 
        this.date = body.date;
      }
    
      static isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 정규 표현식
        return regex.test(dateString);
      }
    

  async create() {
    const { user_id, title, content } = this.body;
    const image = this.file;  

    // content가 없는 경우
    if (!content || content.trim() === "") {
     return {code: 400} 
    }
    //날짜형식이 잘못된 경우
    if (this.date && !Diary.isValidDate(this.date)) {
      return { code: 400, message: "날짜 형식이 잘못되었습니다." };
    }

    const imagePath = image ? await s3Utils.uploadImage("diary_images", image, user_id) : null; 
    const diaryInfo = { user_id, title, content, imagePath, date: this.date };
 
    await diaryStorage.createDiary(diaryInfo); 
    
    return { code: 201 };
  }
}

  module.exports = Diary;

  //날짜형식 유효성 검사 후 리턴문에 적기