const OpenAI = require("openai");

const client = new OpenAI({
    api_key: process.env.OPENAI_API_KEY
});

module.exports  = { 
    // 코멘트 생성 함수
    createComment : async (diaryContent) => {
      const response = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
          max_tokens: 256,
          messages: [
          {
            role: "system",
            content: process.env.ASSISTANT_ROLE_1
          },
          {
            role: "user",
            content: diaryContent
          }
        ]
      }); 
      return response.choices[0].message.content;
    },
    // 감정 점수 측정 함수
    createSentiment: async (diaryContent) => {
      const response = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
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
        ]
      }); 
      return parseFloat(response.choices[0].message.content);
    }
};