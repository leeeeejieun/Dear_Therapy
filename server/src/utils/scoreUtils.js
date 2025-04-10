const axios = require("axios");

// 시간 간격에 따른 가중치 반환
const calculateTimeWeight = (dayDiff) => {  
   if(dayDiff <= 0 || dayDiff > 31) return 0;  // 과거 0% 현재 100% 반영
   if(dayDiff <= 3) return 0.3;    // 과거 30% 현재 70% 반영
   if(dayDiff <= 7) return 0.2;    // 과거 20% 현재 80% 반영
   if(dayDiff <= 31) return 0.1;   // 과거 10% 현재 90% 반영
};

// 키워드 일치 점수 계산
const calculateKeywordMatch = async (today, past) => {
    if(!past) return 0;
    
    try {
        const result = await axios.post("http://127.0.0.1:5000/analyze", {
            today: today, 
            past: past
        });
        return result.data.matchScore;
    } catch(err) {
        console.log(err)
        return 0;   
    }
};

// 감정 종류에 맞는 점수 범위 설정
const scoreRange = (emotion, score) => {
    const ranges = {
        행복: {min: 7, max: 10},
        중립: {min: 5, max: 6},
        슬픔: {min: 1, max: 4},
        분노: {min: 1, max: 4},
        불안: {min: 1, max: 4},
    };

    const range = ranges[emotion];

    if(score < range.min) return range.min;
    if(score > range.max) return range.max;

    return score;
};



// 키워드 일치율 및 시간에 따른 가중치를 적용한 감정 점수 추산
const calculateScore = async (pastInfo, todayInfo) => {
   const { recentScore, dayDiff, pastDiaries } = pastInfo
   const { todayEmotion, todayScore, todayDiary } =  todayInfo;

   const weight = calculateTimeWeight(dayDiff);
   const emaScore = weight * recentScore + (1 - weight) * todayScore;  
   const keywordMatchScore = await calculateKeywordMatch({"content": todayDiary, "emotion": todayEmotion}, pastDiaries); 
   
   // 최종 점수 계산
   const updateScore = scoreRange(todayEmotion, Math.round(emaScore + keywordMatchScore))
   
   return updateScore;   
}

module.exports = calculateScore;