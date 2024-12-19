import React, {useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "contexts/UserContext";
import { getMonthEmoji } from "api/calendar";

const CalenderBody = ({daysInMonth, currentDate}) => {
    const [emojis, setEmojis] = useState([]);
    const { user } =  useContext(UserContext);
    const weeks = ["일", "월", "화", "수", "목", "금", "토"];
    
    const getEmojis = useCallback (async () => {
        try {
            const response = await getMonthEmoji({user_id: user, date: currentDate})
            setEmojis(response.data.success);
        } catch(err) {
             console.log(err.response.data.error)
    }},[user, currentDate]);

    useEffect(() => {
        getEmojis();
    },[getEmojis, currentDate]);

    
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
                        <Day $isInMonth={date.isInMonth}> 
                            <span>{date.day}</span>
                            { date.isInMonth &&
                              emojis.map((emoji) => emoji.day === date.date ? <Emojis key={emoji.day}>{emoji.emoji}</Emojis> : null)}
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
    top: 6.5rem;
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
    height: 100%;
    gap: 8px;
`

const WeekBorder = styled.div`
   padding: 5px;
   > img {
     cursor: default;
   }
`;

const Day = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    text-align: center;
    border: none;
    font-size: 18px;
    height: 65px;
    cursor: pointer;

    > span {
        color: ${({ $isInMonth }) => ($isInMonth ? "black" : "gray")};
    }
`;

const Emojis = styled.span`
    position: relative;
    top: 1rem;
    font-size: 20px;
`;
