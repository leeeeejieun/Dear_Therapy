from flask import Flask, request, jsonify
from flask_cors import CORS
from konlpy.tag import Okt
from collections import Counter

app = Flask(__name__)
CORS(app)

okt = Okt()

# 키워드 추출 함수
def extract_keywords(text):
    with open("stopwords-ko.txt", "r", encoding="utf-8") as f:
        stop_words = [line.strip() for line in f.readlines()]

    # 명사 추출
    words = okt.nouns(text)
    
    # 불용어를 제외하고 길이가 1보다 긴 키워드 반환
    filtered_words = [word for word in words if word not in stop_words and len(word) > 1]
    
    return filtered_words

# 감정이 부정 or 긍정인지 확인하는 함수
def get_emotion_type(emotion):
    return "positive" if emotion == "행복" else "negative"

# 월별 주요 키워드 추출하는 함수
def get_monthly_keywords(diaries):
    monthly_keywords = {}

     # 입력이 단일 딕셔너리일 경우 리스트로 감싸기
    if isinstance(diaries, dict):
        diaries = [diaries]

    # 각 월별로 키워드를 추출하여 빈도 계산
    for diary in diaries:
        month = diary['month']
        
        # 키워드 추출
        keywords = extract_keywords(diary['content'])
        
        # 월별로 키워드 누적
        if month not in monthly_keywords: 
            monthly_keywords[month] = []   # 해당 월을 키 값으로 빈 리스트 생성
        monthly_keywords[month].extend(keywords)  # 키워드 저장
    
    # 월별 주요 키워드 추출
    for month in monthly_keywords:
        count = Counter(monthly_keywords[month])  # 키워드 빈도수 계산  
       
        top_keywords = count.most_common(1)        # 가장 자주 등장한 키워드 1개 반환
        monthly_keywords[month] = top_keywords[0][0]
      
    return monthly_keywords

# 점수 조정을 위해 키워드 일치율 확인하는 엔드포인트
@app.route("/analyze", methods = ["POST"])
def analyze_text():
    data = request.get_json()
    today_diary = data.get("today", {})
    past_diaries = data.get("past", [])
    
    # 키워드 일치 개수 확인
    count = 0
    
    # 오늘 분석된 일기가 중립인 경우에는 키워드 일치율 확인 X
    if today_diary["emotion"] == "중립":
        return jsonify({"matchScore": 0})
    
    today_keywords = extract_keywords(today_diary["content"])
    today_emotion = get_emotion_type(today_diary["emotion"])

    # 키워드와 감정 종류가 일치한 경우 count에 1씩 더함 
    for past_diary in past_diaries:
        past_keywords = extract_keywords(past_diary['content'])
        past_emotion = get_emotion_type(past_diary['emotion'])
        
        if set(today_keywords) & set(past_keywords) and today_emotion == past_emotion:
            count += 1
    
    # 점수 계산
    match_score =  0.1* count if today_emotion == "positive" else -(0.1 * count) 
    
    return jsonify({"matchScore": match_score})

# 월별 주요 키워드 제공 엔드포인트
@app.route("/month_keywords", methods=["POST"])
def monthly_keywords():
    data = request.get_json()
    diaries = data.get("diaries", [])
    month_keyword = get_monthly_keywords(diaries)
    
    return jsonify({"monthKeyword": month_keyword})

if __name__ == '__main__':
    app.run(debug=True)