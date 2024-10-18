"use strict";

const s3Utils = require('../utils/s3Utils');
const diaryStorage = require('./diaryStorage');

class Diary{
  constructor(userId, title, content){
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.image = image;
    
  }

  async create() {
    try {
      const { userId, title, content, image } = this.body; 
      //본문이 없는 경우
      if (!content || content.trim() === "") {
        return { code: 400, message: "내용을 입력하지 않았습니다." };
      }

      let imagePath = null;

      // 이미지가 존재할 경우 S3에 업로드
      if (image) {
        imagePath = await s3Util.uploadImage('diary_images', image, userId); // S3에 이미지 업로드 후 경로 반환
      }

      // 다이어리 정보 저장
      const diaryInfo = {
        userId,
        title,
        content,
        imagePath 
      };

      await DiaryStorage.createDiary(diaryInfo); 

      return { code: 200 }; // 성공 응답
    } catch (err) {
      throw err;
   }
  }
}
  module.exports = Diary;