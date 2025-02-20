import {
    addMonths,
    subMonths,
    addYears,
    subYears,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    startOfWeek,
    startOfMonth,
} from "date-fns";
import { useState } from "react";

const useCalender = () => {
    const [currentDate, setCurrantDate] = useState(new Date());  // Sun Nov 17 2024 00:30:08 GMT+0900 (한국 표준시)과 같은 데이터 반환
    const currentMonth = format(currentDate, "M"); // 현재 월 반환
    const currentYear = format(currentDate, "yyyy") // 현재 연도 반환

   const startCurrentMonth = startOfMonth(currentDate);        
   const endCurrentMonth = endOfMonth(currentDate);            
   const startOfFirstWeek = startOfWeek(startCurrentMonth);     
   const endOfLastWeek = endOfWeek(endCurrentMonth);

   // 현재 월의 모든 날짜 반환(시작일과 종료일 사이의 날짜를 배열로 반환)
   const days =  eachDayOfInterval({
        start: startOfFirstWeek , 
        end: endOfLastWeek
    });  

    // 이전 달로 이동
    const handlePrevMonth  = () => {
        setCurrantDate((prevDate) => subMonths(prevDate, 1));
    }

    // 다음 달로 이동 
    const handleNextMonth = () => {
        setCurrantDate((prevDate) => addMonths(prevDate, 1));
    }

    // 이전 연도로 이동
    const handlePrevYear = () => {
        setCurrantDate((prevDate) => subYears(prevDate, 1));
    }

    // 다음 연도로 이동
    const handleNextYear = () => {
        setCurrantDate((prevDate) => addYears(prevDate, 1));
    }

    // 각 날짜에 대한 정보 반환
    const daysInMonth = days.map((day) => {
        const isCurrentMonth = format(day, "M") === currentMonth // 주어진 날짜가 해당 월에 속하는지 확인
        return {
        date: format(day, "yyyy-M-d"),         
        day: format(day, "d"),              
        dayIndexOfWeek: getDay(day),    
        isInMonth: isCurrentMonth, 
    }});

   return {
        currentDate: format(currentDate, "yyyy-M-d"),
        currentYear,
        currentMonth,
        daysInMonth,
        dispatch: {
            handlePrevMonth,
            handleNextMonth,
            handlePrevYear,
            handleNextYear,
        },
    }; 
};

export default useCalender;