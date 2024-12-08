const s3Utils = require('../utils/s3Utils');
const diaryStorage = require('../models/diaryStorage');

class Diary{
  constructor(body, file){
        this.body = body;
        this.file = file; 
      }
    
      isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 정규 표현식
        return regex.test(dateString);
      }
    

  async create() {
    const { user_id, date, title, content} = this.body;
    const image = this.file;  

    // content, title, date가 공백이거나 undifined인 경우
    if (!title || !content || !date) {
     return {code: 400, message: "잘못된 형태의 데이터 입니다."}; 
    }
  
    //날짜형식이 잘못된 경우
    if (!this.isValidDate(date)) {
      return { code: 400, message: "잘못된 형태의 데이터 입니다." };
    }

    // 해당 날짜에 이미 일기가 존재하는 경우
    const existingDiary = await diaryStorage.findDate(user_id, date); 
    if (existingDiary) {
      return { code: 409, message: "해당 날짜의 일기가 이미 존재합니다." };
    }
    
    const createdAt = date;
    const imagePath = image ? await s3Utils.uploadImage("diary_images", image, user_id, createdAt) : null; 
    const diaryInfo = { user_id, title, content, imagePath, created_date: createdAt  };
 
    await diaryStorage.createDiary(diaryInfo); 
    
    return { code: 201 };
  }
  
  // 특정 사용자의 특정 날짜에 해당하는 일기 조회
  async lookUp() { 
    const { user_id, date} = this.body;

     // user_id나 date가 공백이거나 undefined인 경우 , 날짜 형식이 잘못된 경우
    if (!user_id || !date || !this.isValidDate(date)) {
      return { code: 400, message: "잘못된 형태의 데이터 입니다." }; 
    }

    const diary = await diaryStorage.findDate(user_id, date); 
    // 일기가 없는 경우 처리
    if (!diary) {
      return { code: 404, message: "해당 날짜의 일기가 존재하지 않습니다." }; }

    // 일기가 존재할 경우 이미지 URL 생성
    if (diary.image) {
        const signedUrl = await s3Utils.getImage(diary.image);
        diary.imageUrl = signedUrl;
    }
    
    return { 
      code: 200, 
      data: {
        diary: { 
            title: diary.title, 
            content: diary.content, 
            image: diary.image || null
          },
          recommendation: { 
            comment: null 
          },
        }, 
      }
    };
  };



  module.exports = Diary;
