// 가중치 계산
const calculateWeight = (dayDiff) => {  
   if(dayDiff <= 0 || dayDiff > 31) return 0;  
   if(dayDiff <= 3) return 0.3;    
   if(dayDiff <= 7) return 0.2;    
   if(dayDiff <= 31) return 0.1;   
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



// 시간에 따른 가중치 적용
const calculateEMAScore = (recentInfo, todayInfo) => {
   const recentScore = recentInfo.recent_score;
   const dayDiff = recentInfo.day_diff
   const { todayEmotion, todayScore } =  todayInfo;
   
   const weight = calculateWeight(dayDiff);
   const updateScore = scoreRange(todayEmotion, Math.round(weight * recentScore + (1 - weight) * todayScore));
   
   return updateScore;   
}

module.exports = calculateEMAScore;