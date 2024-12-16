import React from 'react';
import CalenderHeader from 'components/calender/CalenderHeader';
import CalenderBody from 'components/calender/CalenderBody';
import BottomNavigation from 'components/common/BottomNavigation';
import useCalender from "hooks/useCalender";
import AuthLink from 'components/common/AuthLink';
import styled from 'styled-components';

const HomePage = () => {
    const { currentMonth, dispatch, daysInMonth, selectedDate } =  useCalender();
    
    return(
        <HomeContainer>
            <CalenderContainer>
                <CalenderHeader dispatch={dispatch} currentMonth={currentMonth}/>
                <CalenderBody daysInMonth={daysInMonth} selectedDate={selectedDate}/>
            </CalenderContainer>
            <AuthLink  link="/diary" linkType="today"  text="오늘의 일기 쓰기" state={{selectedDate: selectedDate.date}}/>
            <BottomNavigation />
        </HomeContainer>
    );
};

export default HomePage;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const CalenderContainer = styled.div`
    flex-grow: 1;
`