const xlsx = require("xlsx")
const fs = require("fs");
const path = require('path');

const excelFilePath = path.join(__dirname, "data.xlsx");
const workbook = xlsx.readFile(excelFilePath);

// 첫 번째 시트와 두 번째 시트 데이터를 가져오기
const sheetNames = workbook.SheetNames;
const sheet1 = workbook.Sheets[sheetNames[0]]; 
const sheet2 = workbook.Sheets[sheetNames[1]]; 

const emotion = xlsx.utils.sheet_to_json(sheet1);
const comment = xlsx.utils.sheet_to_json(sheet2);

// 자동으로 JSONL 파일을 만드는 함수
const  createJsonlFromExcel = (filename) => {
  const fileStream = fs.createWriteStream(filename, { flags: 'a', encoding: 'utf-8' });

  emotion.forEach(entry => {
    // 감정과 점수를 결합하여 assistantContent로 설정
    const assistantContent = `${entry.감정}, ${entry.점수}`;
    const jsonObject = {
      "messages": [
        { "role": "system", "content": "텍스트를 분석하여 감정을 분류하고, 해당 감정을 1~10점으로 점수화하세요. 감정은 \"분노, 불안, 슬픔 (1~4점)\", \"중립 (5~6점)\", \"행복 (7~10점)\" 범위로 분류합니다. 감정과 점수만 출력하세요." },
        { "role": "user", "content": entry.문장 }, // 문장 데이터
        { "role": "assistant", "content": assistantContent } // 감정과 점수 결합
      ]
    };
    
    // JSON 형식으로 변환하여 한 줄씩 파일에 기록
    fileStream.write(JSON.stringify(jsonObject) + '\n');
  });

  comment.forEach(entry => {
    const jsonObject = {
      "messages": [
        { "role": "system", "content": "사용자의 감정을 이해하고, 공감과 격려를 담은 위로의 메시지를 작성하세요. 메시지는 따뜻한 어조로 2~3줄로 작성해주세요." },
        { "role": "user", "content": entry.문장 }, 
        { "role": "assistant", "content": entry.코멘트 } 
      ]
    };
    fileStream.write(JSON.stringify(jsonObject) + '\n');
  });

  fileStream.end();
}

// 엑셀 데이터로 JSONL 파일 생성
createJsonlFromExcel("trainingData.jsonl");