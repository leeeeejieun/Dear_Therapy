const analysisStorage = require("./analysisStorage");
const diaryStorage = require("../models/diaryStorage");
const requestAnalysis = require("../utils/analysisUtils");
const AnalysisStorage = require("./analysisStorage");

class Analysis {

    constructor(body) {
        this.body = body;
    }

    // 날짜 유효성 검사
    isValidDate(dateString) {
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/; 
        return regex.test(dateString);
    }

    // 데이터 유효성 검사
    isValidData(userInfo) {
        const {user_id, date} = userInfo;
        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }
    }

    // 감정을 나타내는 문자열을 이모티콘으로 변환
    getEmoji(emotion) {
       const emogis = {
        슬픔: "😢",
        분노: "😡",
        불안: "😬",
        중립: "😶",
        행복: "😊",
       }
       
       const data = emotion.map(emotion => ({
        "day": emotion.day,
        "emogi": emogis[emotion.emotion],
       }));

       return data;
    }

    async analysis() {
        const { user_id, date} =  this.body;
        const userInfo =  this.body;

        this.isValidData(user_id, date);

        const diaryContent = await diaryStorage.findDate(user_id, date);
       
        if(!diaryContent) {
            return { code: 404, message: "해당 날짜의 일기가 존재하지 않습니다." }; 
        }

        // 감정 분석 요청
        const response = await requestAnalysis(diaryContent.content);  
        const {sentiment, comment} = response;          
        const [emotion, score] = sentiment.split(",");  // 감정 분류와 점수 분리
        userInfo.comment = comment;
        userInfo.emotion = emotion;
        userInfo.score = score;
    
        // 감정 분류 및 점수 결과 저장
        await analysisStorage.insertEmotion(userInfo);

        // 코멘트 저장
        await analysisStorage.insertRecommend(userInfo)

        return {code: 201}
    }

    async recommend() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;

        this.isValidData(user_id, date);

        const recommend = await AnalysisStorage.getRecommend(userInfo);
        
        if(!recommend) {
            return {code: 404, message: "해당 일기는 감정 분석이 수행되지 않았습니다."}
        }

        return {code: 200,
                data: {
                    comment: recommend.comment,
                    image: recommend.image,
                    text: recommend.text
                }};
    }

    async emotion() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;

        this.isValidData(user_id, date);

        const emotion = await AnalysisStorage.getEmotion(userInfo);

        if(!emotion) {
            return {code: 404, message: "해당 월에 작성된 일기가 없습니다."}
        }

        const data = this.getEmoji(emotion);

        return {code: 200, data: data}
    }
}

module.exports = Analysis;