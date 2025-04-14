const axios = require("axios");

// 월별 주요 키워드 추출
const getMonthKeywords = async (diaries) => {
    try {
        const result = await axios.post("http://127.0.0.1:5000//month_keywords", {
            diaries: diaries,
        });
        return result.data.monthKeyword;
    } catch(err) {
        console.log(err)
    }
};

module.exports = getMonthKeywords;