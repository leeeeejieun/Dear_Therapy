const analysisStorage = require("./analysisStorage");
const requestAnalysis = require("../utils/analysisUtils");

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
            "day": emotion.day,
            "emoji": emojis[emotion.emotion],
        }));
       } else {
        data = [{"day": emotion.day, "emoji": emojis[emotion.emotion]}]
       }
       return data;
    }

    async analysis() {
        const { user_id, date} =  this.body;
        const userInfo =  this.body;
        
        const diaryContent = await analysisStorage.findDiary(user_id, date);
       
        // 감정 분석 요청
        const response = await requestAnalysis(diaryContent.content);  
        const {sentiment, comment,text, image} = response;          
        const [emotion, score] = sentiment.split(",");  // 감정 분류와 점수 분리
        userInfo.diary_id = diaryContent.diary_id;
        userInfo.comment = comment;
        userInfo.emotion = emotion;
        userInfo.score = score;
        userInfo.image = image;
        userInfo.text = text;
      
        // 감정 분류 및 점수 결과 저장
        await analysisStorage.insertEmotion(userInfo);

        // 코멘트 저장
        await analysisStorage.insertRecommend(userInfo)

        return {code: 201}
    }

    async recommend() {
        console.log(this.body)
        const userInfo =  this.body;
        const {user_id, date} = userInfo;
        
        if (!user_id || !date || !this.isValidDate(date)){
            return {code: 400, message: "잘못된 형태의 데이터 입니다."};
        }
     
        const recommend = await analysisStorage.getRecommend(userInfo);
        
        if(!recommend ) {
            return {code: 404, message: "해당 일기는 감정 분석이 수행되지 않았습니다."}
        }

        return { code: 200,
                 data: {
                    comment: recommend.comment,
                    image: recommend.image,
                    text: recommend.text
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

        const score = await analysisStorage.getScore(userInfo);

        if(!score) {
            return {code: 404, message: "해당 연도에 분석된 일기가 없습니다."}
        }

        return {code: 200, data: Array.isArray(score) ? score : [score]}
    }
}

module.exports = Analysis;