const analysisStorage = require("./analysisStorage");
const diaryStorage = require("../models/diaryStorage");
const requestAnalysis = require("../utils/analysisUtils");
const { text } = require("express");
const AnalysisStorage = require("./analysisStorage");

class Analysis {

    constructor(body) {
        this.body = body;
    }

    isValidDate(dateString) {
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/; 
        return regex.test(dateString);
    }

    async analysis() {
        const { user_id, date} =  this.body;

        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }
        
        const diaryContent = await diaryStorage.findDate(user_id, date);
       
        if(!diaryContent) {
            return { code: 404, message: "해당 날짜의 일기가 존재하지 않습니다." }; 
        }

        // 감정 분석 요청
        const response = await requestAnalysis(diaryContent.content);  
        const {sentiment, comment} = response;          
        const [emotion, score] = sentiment.split(",");  // 감정 분류와 점수 분리
    
        // 감정 분류 및 점수화 결과 저장
        await analysisStorage.insertEmotion({
            user_id: user_id, 
            diary_id: diaryContent.diary_id, 
            emotion: emotion, 
            score: score});

        // 코멘트 저장
        await analysisStorage.insertRecommend({
            user_id: user_id, 
            diary_id: diaryContent.diary_id,
            comment: comment});

        return {code: 201}
    }

    async recommend() {
        const userInfo =  this.body;
        const {user_id, date} = userInfo;

        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }

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
}

module.exports = Analysis;