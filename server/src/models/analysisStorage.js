const db = require("../config/db");

class AnalysisStorage {
    
    // 일기 정보 가져오기
    static async findDiary(user_id, date) {
        const query = "SELECT diary_id, content FROM Diary WHERE user_id = ? AND created_date = ?";
        const result = await db.connection(query, [user_id, date]);
        return result; 
    }

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

    // 월별 평균 감정 점수 통계 제공
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

    // 월별 주요 감정 제공
    static async getMonthEmotion(userInfo) {
        const {user_id, date} =  userInfo;
        const query = `SELECT emotion, month
                       FROM (SELECT 
                                emotion,
                                month(date) as month,
                                count(*) as frequency,
                                rank() over(partition by month(date) order by count(*) desc) as rnk
                             FROM EmotionAnalysis
                             WHERE user_id = ?
                             AND year(date) = year(?)
                             GROUP BY emotion, month(date)) as ranked
                             WHERE rnk = 1`;
        const result = await db.connection(query, [user_id, date]);
        
        return result;  
    }

    // 한 달 이내의 과거 감정 점수 평균을 시간 간격별로 반환
    static async dateDiff (user_id, date) {
        const query = `SELECT 
                        ROUND(AVG(CASE WHEN datediff(?, ea.date) <= 3 THEN ea.score END)) AS avg_3_days,
                        ROUND(AVG(CASE WHEN datediff(?, ea.date) > 3 AND datediff(?, ea.date) <= 7 THEN ea.score END)) AS avg_3_to_7_days,
                        ROUND(AVG(CASE WHEN datediff(?, ea.date) > 7 AND datediff(?, ea.date) <= 31 THEN ea.score END)) AS avg_7_to_31_days
                       FROM EmotionAnalysis ea
                       WHERE
                        ea.user_id = ? AND
                        ea.date < ? AND
                        month(ea.date) = month(?)
                       ORDER BY ea.date DESC;`;
        const result = await db.connection(query, [date, date, date, date, date, user_id, date, date]);
        return result;
  }

    // 주어진 날짜를 기준으로, 같은 달에 작성된 과거 일기 정보(내용, 감정 종류) 반환
    static async getPastDiaries (user_id, date) {
        const query = `SELECT d.content, e.emotion
                       FROM Diary d
                       JOIN EmotionAnalysis e ON d.created_date = e.date 
                       WHERE date_format(created_date, '%Y-%m') = date_format(?, '%Y-%m')
                       AND created_date < ?
                       AND d.user_id = ?
                       ORDER BY created_date;`
        const result = await db.connection(query, [date, date, user_id]);
       
        return result;
    }

    // 주어진 날짜의 감정 분석 결과 및 최근 과거 날짜의 감정 점수 제공
    static async getEmotionResult (user_id, date) {
        const query = `SELECT emotion, score,
                       (SELECT score FROM EmotionAnalysis WHERE user_id = ? and date < ?  order by date desc limit 1) as recent_score
                       FROM EmotionAnalysis
                       WHERE (user_id, diary_id) IN ( SELECT user_id, diary_id
								FROM Diary
								WHERE user_id = ? AND created_date = ?);`
        const result = await db.connection(query, [user_id, date, user_id, date])
       
        return result;
    }

    // 해당 연도 모든 일기 데이터 가져오기
    static async getYearDiaries (user_id, date) {
        const query = `SELECT month(created_date) month, content
                       FROM Diary
                       WHERE year(created_date) = year(?)
                       AND user_id = ?
                       ORDER BY created_date;`
        const result = await db.connection(query, [date, user_id]);

        return result;
    }
    
}
module.exports = AnalysisStorage;