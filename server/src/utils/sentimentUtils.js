const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = ` https://language.googleapis.com/v2/documents:analyzeSentiment?key=${GOOGLE_API_KEY}`;

const analyzeSentiment = async (diaryContent) => {

    const requestData = {
        document: {
            content: diaryContent,  // 사용자 일기
            type: "PLAIN_TEXT",     // 일반 텍스트 형식
        },
        encodingType: "UTF8"
    } 

    const response = await axios.post(BASE_URL, requestData);
    return response.data.documentSentiment;   // magnitude(감정 강도), score(감정 점수) 반환 
};

module.exports = analyzeSentiment;