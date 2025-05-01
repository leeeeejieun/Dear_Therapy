const axios = require("axios");

// 시간 간격에 따른 가중치 반환
const calculateTimeWeight = (pastScores, todayScore) => {
    const { avg_3_days, avg_3_to_7_days, avg_7_to_31_days } = pastScores; 
    const weightInfo = [
        { weight: 0.3, avgScore: avg_3_days }, // 3일 이내 
        { weight: 0.2, avgScore: avg_3_to_7_days }, // 7일 이내
        { weight: 0.1, avgScore: avg_7_to_31_days } // 한 달 이내
    ];
    
    let weightedScore = 0;  // 각 그룹의 계산 결과 합계 저장   
    let totalCount = 0;     // 계산 횟수
    
    // 각 그룹별에 맞는 가중치 적용하여 점수 산출
    weightInfo.forEach(({ weight, avgScore }) => {
        if (avgScore !== null) {
            weightedScore += weight * avgScore + (1 - weight) * todayScore;
            totalCount += 1;
        }
    });
    
    // 한 달 이내의 일기가 존재하지 않는 경우
    if (totalCount === 0) {
        weightedScore = todayScore;  
    } else {
        weightedScore /= totalCount;
    }
    return Math.round(weightedScore * 10) / 10; 
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
   const { pastScores, pastDiaries } = pastInfo
   const { todayEmotion, todayScore, todayDiary } =  todayInfo;
   
   // 날짜 간격에 따른 가중치 적용
   const weightedScore = calculateTimeWeight(pastScores, todayScore);
   // 키워드 일치율에 따른 점수 조정
   const keywordMatchScore = await calculateKeywordMatch({"content": todayDiary, "emotion": todayEmotion}, pastDiaries); 
   
   // 최종 점수 계산
   const updateScore = scoreRange(todayEmotion, Math.round(weightedScore + keywordMatchScore))
   
   return updateScore;   
}

module.exports = calculateScore;