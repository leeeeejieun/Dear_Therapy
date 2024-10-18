"use strict";

const db = require("../config/db");

class DiaryStorage{
  //생성된 일기를 DB에 저장
  static async createDiary(diaryInfo){
    try{
      const {userId, title, content, imagePath} = diaryInfo;
      const query = "INSERT INTO diary (userId, title, content, imagePath, createdAt) VALUES (?, ?, ?, ?, NOW())";
      await db.connection.query(query, [userId, title, content, imagePath]);
      console.log("성공적으로 저장됐습니다.");
    } catch(err){
      console.error("일기 저장 중 오류 발생:", err);
      throw err;
    }

  }
}

module.exports = DiaryStorage;