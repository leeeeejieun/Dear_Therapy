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

  static async updateDiary(user_id, date, updates) {
    const { title, content, imagePath } = updates;

    const query = `
      UPDATE Diary
      SET title = ?, content = ?, image = ?
      WHERE user_id = ? AND created_date = ?
    `;
  
   
    const result = await db.connection(query, [title, content, imagePath, user_id, date]);
    
    return result;
  }
  static async deleteDiary (user_id, date) {
    console.log(user_id, date);
    const query = `DELETE FROM Diary WHERE user_id = ? AND created_date = ?`;
    await db.connection(query, [user_id, date]);
    
  }

}

module.exports = DiaryStorage;