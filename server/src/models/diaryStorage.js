const db = require("../config/db");

class DiaryStorage{

  // DB에 이미 존재하는 일기 조회
  static async findDate(user_id, date){
    
    const query = "SELECT * FROM Diary WHERE user_id = ? AND created_date = ?";
    const result = await db.connection(query, [user_id, date]);
    return result; // 결과 반환 (없으면 null)
}
  //생성된 일기를 DB에 저장
  static async createDiary(diaryInfo){
    const {user_id, title, content, imagePath, created_date} = diaryInfo;

    const query = "INSERT INTO Diary (user_id, title, content, image, created_date) VALUES (?, ?, ?, ?, ?)";
   
    await db.connection(query, [user_id, title, content, imagePath, created_date]);
  }
}

module.exports = DiaryStorage;