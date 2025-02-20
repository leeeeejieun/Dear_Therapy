const fs = require("fs");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const filePath = path.join(__dirname, "trainingData.jsonl");

// jsonl 파일 업로드
const uploadFile = async () => {
    const result = await openai.files.create({
        file: fs.createReadStream(filePath),  // jsonl 파일 경로
        purpose: 'fine-tune',
    });
    console.log(result);
}

uploadFile();

//파인튜닝 실행
const fineTuning = async () => {
    const result = await openai.fineTuning.jobs.create({
        training_file: "file-JuqPsJoaB6Z48mEqahy4t3",      // 업로드된 훈련 파일 ID값
        model: "gpt-4o-mini-2024-07-18" ,             // 학습 시킬 모델명
        hyperparameters: {
             n_epochs: 5,    
             batch_size: 1
        },            
    });
    console.log(result);
};

fineTuning();
