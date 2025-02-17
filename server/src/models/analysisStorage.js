const db = require("../config/db");
const { emotion } = require("../controllers/analysisCtrl");


class AnalysisStorage {
    
    // 감정 분석 결과 저장(감정 종류&점수)
    static async insertEmotion(userInfo){
        const {user_id, diary_id, emotion, score, date} = userInfo
        const query =  `INSERT INTO EmotionAnalysis (user_id, diary_id, emotion, score, date) VALUES(?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE emotion = ?, score = ?, date = ?`
        await db.connection(query, [user_id, diary_id, emotion, score, date, emotion, score, date]);
    }

    // 추천 정보 저장(추후에 추천 정보 & 이미지 추가 필요)
    static async insertRecommend(userInfo) {
        const {user_id, diary_id, comment, text, image} = userInfo;
        const query = `INSERT INTO Recommendation (user_id, diary_id, comment, image, text) VALUES(?, ?, ?, ?, ?)
                       ON DUPLICATE KEY UPDATE comment = ?, image = ?, text =?`         
                       
        await db.connection(query, [user_id, diary_id, comment, image, text, comment, image, text]);
        
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

    // 월별 감정 상태 정보 제공
    static async getEmotion(userInfo) {
        const {user_id, date} =  userInfo;
        
        const query = `SELECT date_format(date,'%Y-%c-%e') day, emotion
                       FROM EmotionAnalysis
                       WHERE user_id = ? and date_format(date, '%Y-%c') = date_format(?, '%Y-%c')
                       order by date;`
        const response = await db.connection(query, [user_id, date]);
        return response;
    }

    // 월별 감정 점수 통계 제공
    static async getScore(userInfo) {
        const {user_id, date} =  userInfo;
        const query =  `SELECT month(date) month, truncate(AVG(score),1) score
                        FROM EmotionAnalysis 
                        WHERE user_id = ? and year(date) = year(?)
                        GROUP BY month
                        order by date;`
        const response = await db.connection(query, [user_id, date]);
        return response;
    }
}
module.exports = AnalysisStorage;