const OpenAI = require("openai");

const client = new OpenAI({
    api_key: process.env.OPENAI_API_KEY
});

// 감정 분류 및 점수화 
const createSentiment = async (diaryContent) => {
  const response = await client.chat.completions.create({
    model: process.env.FINE_TUNING_MODEL,
    max_tokens: 50,
    messages: [
    {
      role: "system",
      content: process.env.ASSISTANT_ROLE_1
    },
    {
      role: "user",
      content: diaryContent
    }
  ]}); 
  return response.choices[0].message.content;
};

// 코멘트 생성
const createComment = async (diaryContent) => {
  const response = await client.chat.completions.create({
    model: process.env.FINE_TUNING_MODEL,
    max_tokens: 256,
    messages: [
    {
      role: "system",
      content: process.env.ASSISTANT_ROLE_2
    },
    {
      role: "user",
      content: diaryContent
    }
  ]}); 
  return response.choices[0].message.content;
};

const requestAnalysis = async (diaryContent) => {
  // 비동기 작업을 병렬로 처리
  const [sentiment, comment] = await Promise.all([createSentiment(diaryContent), createComment(diaryContent)]);
  return {sentiment: sentiment, comment: comment}
}

module.exports = requestAnalysis;