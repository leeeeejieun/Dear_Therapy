const db = require("../config/db");

class AnalysisStorage {
    
    // 감정 분석 결과 저장(감정 종류&점수)
    static async insertEmotion(userInfo){
        const {user_id, diary_id, emotion, score} = userInfo;
        const query =  `INSERT INTO EmotionAnalysis (user_id, diary_id, emotion, score) VALUES(?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE emotion = ?, score = ?;`
        await db.connection(query, [user_id, diary_id, emotion, score, emotion, score]);
    }

    // 추천 정보 저장(추후에 추천 정보 & 이미지 추가 필요)
    static async insertRecommend(userInfo) {
        const {user_id, diary_id, comment} = userInfo;
        
        const query = `INSERT INTO Recommendation (user_id, diary_id, comment) VALUES(?, ?, ?)
                       ON DUPLICATE KEY UPDATE comment = ?`
        await db.connection(query, [user_id, diary_id, comment, comment]);
    }

    // 추천 정보 조회
    static async getRecommend(userInfo){
        const {user_id, date} = userInfo;
        
        const query = `SELECT comment, image, text
                      FROM Recommendation
                      WHERE (user_id, diary_id) IN ( SELECT user_id, diary_id
                                                     FROM Diary
                                                     WHERE user_id = ? AND created_date = ?
                                                    );`
        const response = await db.connection(query, [user_id, date]);
        return response;
    }
}

module.exports = AnalysisStorage;