const OpenAI = require("openai");

const client = new OpenAI({
    api_key: process.env.OPENAI_API_KEY
});

// 코멘트 생성 함수
const createComment = async (diaryContent) => {
    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 256,
        messages: [
        {
          role: "system",
          content: process.env.ASSISTANT_ROLE
        },
        {
          role: "user",
          content: diaryContent
        }
      ]
    }); 
    return response.choices[0].message.content;
}

module.exports = createComment;