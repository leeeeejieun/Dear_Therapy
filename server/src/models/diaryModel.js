
const s3Utils = require('../utils/s3Utils');
const diaryStorage = require('./diaryStorage');

class Diary{
  constructor(body, file){
        this.body = body;
        this.file = file; 
        this.date = body.date ? body.date.trim() : ""; // date에 공백이 있을 경우 빈 문자열로 처리하며 undifined인 경우 공백으로 뜨도록 설정
      }
    
      static isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 정규 표현식
        return regex.test(dateString);
      }
    

  async create() {
    const { user_id, title, content} = this.body;
    const image = this.file;  

    // content, title, date가 공백이거나 undifined인 경우
    if (!title || title.trim() === "" || !content || content.trim() === "" || !this.date) {
     return {code: 400, message: "잘못된 형태의 데이터 입니다."}; 
    }
  
    //날짜형식이 잘못된 경우
    if (this.date && !Diary.isValidDate(this.date)) {
      return { code: 400, message: "잘못된 형태의 데이터 입니다." };
    }

    // 해당 날짜에 이미 일기가 존재하는 경우
    const existingDiary = await diaryStorage.findDiaryByDate(user_id, this.date); 
    if (existingDiary) {
      return { code: 409, message: "해당 날짜의 일기가 이미 존재합니다." };
    }

    

    const createdAt = this.date;
    const imagePath = image ? await s3Utils.uploadImage("diary_images", image, user_id, createdAt) : null; 
    const diaryInfo = { user_id, title, content, imagePath, created_date: createdAt  };
 
    await diaryStorage.createDiary(diaryInfo); 
    
    return { code: 201 };
  }
  
}

  module.exports = Diary;
