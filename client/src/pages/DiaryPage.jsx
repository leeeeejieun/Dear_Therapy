import React, {useState, useEffect} from "react";
import DateNavigation from "../components/diary/DateNavigation";
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
    </DiaryContainer>
  );
};

export default DiaryPage;

const DiaryContainer = styled.div`
  padding: 20px;
  background-color: #faf3e0; //임시색깔
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
