const db = require("../config/db");

class DiaryStorage{
  //생성된 일기를 DB에 저장
  static async createDiary(diaryInfo){
    const {user_id, title, content, imagePath} = diaryInfo;

    const query = "INSERT INTO Diary (user_id, title, content, image) VALUES (?, ?, ?, ?)";
   
    await db.connection(query, [user_id, title, content, imagePath]);
  }
}

module.exports = DiaryStorage;