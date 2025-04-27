const analysisStorage = require("./analysisStorage");
const calculateScore = require("../utils/scoreUtils")
const requestAnalysis = require("../utils/analysisUtils");
const getEmotionFeedBack = require("../utils/emotionUtils");
const getMonthKeywords = require("../utils/monthKeywordUtils")

class Analysis {

    constructor(body) {
        this.body = body;
    }

    // 날짜 유효성 검사
    isValidDate(dateString) {
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/; 
        return regex.test(dateString);
    }

    // 감정을 나타내는 문자열을 이모티콘으로 변환
    getEmoji(emotion) {
       const emojis = {
        슬픔: "😢",
        분노: "😡",
        불안: "😬",
        중립: "😶",
        행복: "😊",
       }
       
       let data;
       if(Array.isArray(emotion)) {
         data = emotion.map(emotion => ({
            day : emotion.day,
            emoji: emojis[emotion.emotion],
        }));
       } else {
        data = [{day: emotion.day, emoji: emojis[emotion.emotion]}]
       }
       return data;
    }

    async analysis() {
        const { user_id, date} =  this.body;
        const userInfo =  this.body;
        
        const diaryContent = await analysisStorage.findDiary(user_id, date);
    
        // 감정 분석 요청
        const response = await requestAnalysis(diaryContent.content);  
        const {sentiment, comment, text, image} = response;          
        const [emotion, score] = sentiment.split(",");  // 감정 분류와 점수 분리
        
        // 최근 한 달 이내의 과거 점수 가져오기
        const pastScores = await analysisStorage.dateDiff(user_id, date);
        const { avg_3_days, avg_3_to_7_days, avg_7_to_31_days } = pastScores;
        let finalScore  = score;
       
        if(avg_3_days || avg_3_to_7_days || avg_7_to_31_days) {
            const todayInfo = {
                todayEmotion: emotion,
                todayScore: score,
                todayDiary: diaryContent.content
            };
          
            // 현재 날짜를 기준으로, 같은 달에 작성된 과거 일기들을 불러오기
            const pastDiaries = await analysisStorage.getPastDiaries(user_id, date);
            
            // 배열로 변환
            const pastDiariesArray = Array.isArray(pastDiaries) ? pastDiaries : [{"content": pastDiaries.content, "emotion": pastDiaries.emotion}];
           
            const pastInfo = {
                pastScores: pastScores,
                pastDiaries: pastDiariesArray
            }
            
            // 감정 점수 재계산
            const updateScore = await calculateScore(pastInfo, todayInfo);
            
            finalScore = updateScore;
        }
        
        userInfo.diary_id = diaryContent.diary_id;
        userInfo.comment = comment;
        userInfo.emotion = emotion
        userInfo.score = finalScore,
        userInfo.image = image;
        userInfo.text = text;
        
        // 감정 분류 및 점수 결과 저장
        await analysisStorage.insertEmotion(userInfo);
        
        // 코멘트 저장
        await analysisStorage.insertRecommend(userInfo)

        return {code: 201}
    }

    async recommend() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;
        
        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }
     
        const recommend = await analysisStorage.getRecommend(userInfo);
        
        if(!recommend ) {
            return {code: 404, message: "해당 일기는 감정 분석이 수행되지 않았습니다."}
        }

        const emotion = await analysisStorage.getEmotionResult(user_id, date);
        
        const emotionFeedBack = getEmotionFeedBack(emotion);
       

        return { code: 200,
                 data: {
                    comment: recommend.comment,
                    image: recommend.image,
                    text: recommend.text,
                    emotion: emotion.emotion,
                    score: emotion.score,
                    feedback: emotionFeedBack,
                }}; 
    }

    async emotion() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;

        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }

        const emotion = await analysisStorage.getEmotion(userInfo);

        if(!emotion) {
            return {code: 404, message: "해당 월에 분석된 일기가 없습니다."}
        }

        const data = this.getEmoji(emotion);

        return {code: 200, data: data}
    }

    async score() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;

        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }

        const score = await analysisStorage.getScore(userInfo);  // 월별 평균 감정 점수 가져오기
    
        if(!score) {
            return {code: 404, message: "해당 연도에 분석된 일기가 없습니다."}
        }

        const monthEmotion = await analysisStorage.getMonthEmotion(userInfo);    // 월별 주요 감정 가져오기
        const yearDiaries = await analysisStorage.getYearDiaries(user_id, date)  // 해당 연도의 모든 일기 내용 가져오기
        const monthKeyword = await getMonthKeywords(yearDiaries)  // 월별 주요 키워드 가져오기
        
        let data;
        if(Array.isArray(score)) {
            data = score.map((score, index) => ({
                ...score,
                emotion: monthEmotion[index].emotion,
                keyword: monthKeyword[score.month]
            }));
        }
        else {
            data= [{...score, emotion: monthEmotion.emotion, keyword: monthKeyword[score.month]}]
        }
        
        return {code: 200, data: data}
    }
}

module.exports = Analysis;