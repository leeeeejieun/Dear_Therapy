const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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

// 코멘트 생성(정서조절 포함)
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


const createImage = async (recommendationText) => {
  const prompt = generateImagePrompt(recommendationText); 
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt: prompt,                   // 이미지에 맞는 프롬프트 설정
    size: "1024x1024",            
  });
  return response.data[0].url;
  };

  // 추천 텍스트 기반 프롬프트 생성
const generateImagePrompt = (recommendationText) => {
  if (recommendationText.includes("여행")) {
    return `A beautiful travel destination based on the recommendation: "${recommendationText}". A scenic view of a famous location with vibrant atmosphere.`;
  } else if (recommendationText.includes("운동")) {
    return `A person engaging in a healthy workout: jogging in a park, stretching, or lifting weights. Energetic and motivational scene.`;
  } else if (recommendationText.includes("차 한 잔")) {
    return `A cozy setting with a steaming cup of tea on a wooden table. Warm and relaxing atmosphere.`;
  }  else if (recommendationText.includes("음식")) {
      return `A delicious and appetizing dish featuring "${recommendationText}" on a beautifully set dining table. Vibrant colors and rich textures to evoke a sense of taste and aroma.`;
  } else {
    return `A conceptual artistic representation of the following recommendation: "${recommendationText}". Visually engaging and meaningful.`;
  }
};

// 맞춤추천 코멘트
const recommendation = async(diaryContent, sentiment) =>{
  const response = await client.chat.completions.create({
    model: process.env.FINE_TUNING_MODEL,
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

  let recommendationText = response.choices[0].message.content.trim();
  

    // 코멘트 생성 (정서조절 포함)
    const commentResponse = await createComment(diaryContent);
   
    // 이미지 생성
    const imageUrl = await createImage(recommendationText);


    
    return {
      
         comment: commentResponse, 
         image: imageUrl,  
         text: recommendationText,  
      
        };
      };

      
      const requestAnalysis = async (diaryContent) => {
  // 비동기 작업을 병렬로 처리
  const [sentiment, comment, recommendationResult ] = await Promise.all([createSentiment(diaryContent), createComment(diaryContent), recommendation(diaryContent)]);
  const { text, image } = recommendationResult;
  return {sentiment: sentiment, comment: comment, text: text, image: image };
};
  
  
module.exports = requestAnalysis;