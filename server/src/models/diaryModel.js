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

    async update() {
      const { user_id, date, title, content } = this.body;
      const image = this.file; 
      
      // 필수 데이터가 없을 경우 처리
      if (!title || !content || !date) {
        return { code: 400, message: "잘못된 형태의 데이터 입니다." };
      }
  
      // 날짜 형식이 잘못된 경우
      if (!this.isValidDate(date)) {
        return { code: 400, message: "잘못된 날짜 형식입니다." };
      }
  
      // 기존 일기 조회
      const diary = await diaryStorage.findDate(user_id, date);  
      if (!diary) {
        return { code: 404, message: "해당 날짜의 일기가 존재하지 않습니다." };
      }
  
      // 기존 이미지 경로
      const currentImagePath = diary.image || null;
      let newImagePath = currentImagePath;  // 새 이미지 경로, 기존 이미지가 없으면 null
  
      
      if (image) {
        // 기존 이미지가 있고 새 이미지 경로가 다르면 기존 이미지 삭제
        if (currentImagePath) {
          await s3Utils.deleteImage(currentImagePath);
        }
        
        newImagePath = await s3Utils.uploadImage("diary_images", image, user_id, date);
      }else if (image === null) {
        // 이미지가 null로 설정된 경우, 기존 이미지를 삭제하고 null 처리
        if (currentImagePath) {
          await s3Utils.deleteImage(currentImagePath);
        }
        newImagePath = null;
      }
      if (image && image !== null) {
        newImagePath = await s3Utils.uploadImage("diary_images", image, user_id, date);
      }

      const updatedDiaryInfo = {
        user_id,
        title,
        content,
        imagePath: newImagePath,  
        created_date: date,
      };
      
      // 일기 업데이트 호출
     await diaryStorage.updateDiary(user_id, date, updatedDiaryInfo);
      
      
  
      return { code: 201 };
    }
  
  };
  


  module.exports = Diary;
