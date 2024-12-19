import {
    addMonths,
    subMonths,
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
    const [currentMonth] = format(currentDate, "MM").split("-"); // 현재 월 반환
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-d"));  // 사용자가 선택한 날짜를 저장(기본 값은 현재 날짜)

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


    // 특정 날짜 선택
    const handleSelectDate = (date) => {
        setSelectedDate(date);
    }

    // 각 날짜에 대한 정보 반환
    const daysInMonth = days.map((day) => {
        const isCurrentMonth = format(day, "MM") === currentMonth // 주어진 날짜가 해당 월에 속하는지 확인
        return {
        date: format(day, "yyyy-MM-d"),         
        day: format(day, "d"),              
        dayIndexOfWeek: getDay(day),    
        isInMonth: isCurrentMonth, 
    }});

   return {
        currentDate: format(currentDate, "yyyy-MM-d"),
        currentMonth,
        daysInMonth,
        dispatch: {
            handlePrevMonth,
            handleNextMonth,
        },
        selectedDate: {
            date: selectedDate,
            selectDate: handleSelectDate,
        },
    }; 
};

export default useCalender;