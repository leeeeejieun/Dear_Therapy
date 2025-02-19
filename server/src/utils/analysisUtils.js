const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// 감정 분류 및 점수화 
const createSentiment = async (diaryContent) => {
  const response = await client.chat.completions.create({
    model: process.env.FINE_TUNING_MODEL1,
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
    model: process.env.FINE_TUNING_MODEL1,
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


// 추천 정보 기반 이미지 생성
const createImage = async (recommendationText) => {
    const prompt = `${recommendationText}에 어울리는 이미지를 생성해줘`;

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
    });

    return response.data[0].url;
};

// 맞춤 추천 정보 생성
const recommendation = async(diaryContent, sentiment) =>{
  
  const response = await client.chat.completions.create({
    model: process.env.FINE_TUNING_MODEL2,
    max_tokens: 256,
    messages: [
    {
      role: "system",
      content: process.env.ASSISTANT_ROLE_3
    },
    {
      role: "user",
      content: `일기 내용: ${diaryContent}\n 감정 점수: ${sentiment}`,
    },
  ],
}); 

  const recommendationText = response.choices[0].message.content;

  // 이미지 생성
  const imageUrl = await createImage(recommendationText);

  return {
        image: imageUrl,  
        text: recommendationText,  
      };
  };

      
  const requestAnalysis = async (diaryContent) => {
  // 비동기 작업을 병렬로 처리
  const [sentiment, comment] = await Promise.all([createSentiment(diaryContent), createComment(diaryContent)]);
  const{ text, image }  = await recommendation(diaryContent, sentiment);
  return {sentiment: sentiment, comment: comment, text: text, image: image };
};
  
  
module.exports = requestAnalysis;