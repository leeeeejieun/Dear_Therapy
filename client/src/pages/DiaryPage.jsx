import React, {useState, useEffect} from "react";
import DateNavigation from "components/diary/DateNavigation";
import ImageUploader from "components/diary/ImageUploader";
import DiaryForm from "components/diary/DiaryForm";
import SaveButton from "components/diary/SaveButton";
import BottomNavigation from "components/diary/BottomNavigation";
import EmotionAnalysisButton from "components/diary/EmotionAnalysisButton";
import styled from "styled-components";

const DiaryPage = () => {

  const [currentDate, setCurrentDate] = useState('');


  // 현재 날짜 가져오기
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  

  return (
    <DiaryContainer>
      <DateNavigation currentDate={currentDate} />
      <EmotionAnalysisButton />
      <BottomNavigation />
    </DiaryContainer>
  );
};

export default DiaryPage;

const DiaryContainer = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.background};
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
