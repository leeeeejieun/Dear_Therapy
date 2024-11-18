import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CalenderBody = ({daysInMonth}) => {
    const weeks = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <DiaryContainer>
            <DayContainer>
                {weeks.map((week, index) => (
                    <Week key={index} $isSunday={index === 0} $isSaturday={index === 6}>{week}</Week>
                ))}
            </DayContainer>
            <WeekBorder>
                    <img src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%9A%94%EC%9D%BC+%ED%85%8C%EB%91%90%EB%A6%AC.svg" alt="Week Border" />
            </WeekBorder>
            <DayContainer>
                {daysInMonth.map((date) => (
                     <Link to="/diary" state={{selectedDate: date.date}}  key={date.date}>
                        <Day
                            $isInMonth={date.isInMonth}> 
                            <span>{date.day}</span>
                        </Day>
                    </Link>
                ))}
            </DayContainer>
        </DiaryContainer>
        
    );
};

export default CalenderBody;

const DiaryContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 6rem;
    padding: 0 10px;
`;

const Week = styled.div`
    color: ${({ $isSunday, $isSaturday }) => ($isSunday ? "#B12E2E" : $isSaturday ? "#3881D3" : "#000000")}; // 일요일은 빨간색, 토요일은 파란색
    text-align: center;
    font-weight: 600;
`;


const DayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    gap: 8px;
`

const WeekBorder = styled.div`
   padding: 5px;
   > img {
     cursor: default;
   }
`;

const Day = styled.div`
    padding: 18px 10px;
    text-align: center;
    border: none;
    font-size: 18px;
    cursor: pointer;

    > span {
        color: ${({ $isInMonth }) => ($isInMonth ? "black" : "gray")}; 
    }
`;