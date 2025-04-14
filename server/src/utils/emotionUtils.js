const getEmotionFeedBack = (emotion) => {
    const {emotion: todayEmotion, score: todayScore, recent_score: recentScore} = emotion;
   
    if(!recentScore) return getFirstEmotionMessage(todayEmotion);
    
    if(todayScore > recentScore) return getChangeEmotionMessage("상승");
    if(todayScore === recentScore) return getChangeEmotionMessage("유지");
    if(todayScore < recentScore) return getChangeEmotionMessage("하락");
}

// 이번 달에 감정 분석이 처음 수행된 경우
const getFirstEmotionMessage = (emotion) => {
    const messages = {
        행복: "이번 달의 시작을 행복하게 열었네요! 좋은 기운 오래가길 바랄게요 🌞",
        슬픔: "이번 달의 첫 감정이 조금 무겁네요. 그래도 괜찮아요, 천천히 괜찮아질 거예요 🍀",
        불안: "조금 초조한 출발이지만, 오늘 하루 잘 마무리하셨기를 바랍니다 🌙",
        분노: "스트레스가 있었던 하루였나 봐요. 감정을 잘 털어낼 수 있기를 응원할게요 💨",
        중립: "차분하게 시작한 한 달, 앞으로 어떤 감정들이 찾아올까요? 😊",
      };
    
    return messages[emotion];
}

// 점수 변화에 따른 멘트 제공
const getChangeEmotionMessage =  (changeType) => {
    const messages = {
        상승: "오늘은 기분이 좋아진 것 같네요! 긍정적인 변화가 느껴져요. 😊",
        유지: "변화가 없네요. 지금의 기분이 유지되고 있는 것 같아요. ☁️",
        하락: "어제보다 감정 점수가 더 낮아졌어요. 힘든 시간이지만, 지나갈 거예요. 🌧️"
    };

    return messages[changeType];
}

return module.exports = getEmotionFeedBack;