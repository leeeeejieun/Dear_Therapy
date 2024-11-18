import React from "react";
import styled from "styled-components";

const CalenderHeader = ({dispatch, currentMonth}) => {
    return(
       <Header>
        <Button onClick={dispatch.handlePrevMonth}>
            <img src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%BA%98%EB%A6%B0%EB%8D%94+%ED%97%A4%EB%8D%94+%EC%99%BC%EC%AA%BD+%ED%99%94%EC%82%B4%ED%91%9C.svg" alt="no svg" />
        </Button>
        <h1>{currentMonth}월</h1>
        <Button onClick={dispatch.handleNextMonth}>
            <img src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%BA%98%EB%A6%B0%EB%8D%94+%ED%97%A4%EB%8D%94+%EC%98%A4%EB%A5%B8%EC%AA%BD+%ED%99%94%EC%82%B4%ED%91%9C.svg" alt="no svg" />
        </Button>
       </Header>
    );
};  

export default CalenderHeader;

const Header = styled.header`
    position: absolute;
    top: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
`;

const Button = styled.button`
    background: none;
    width: 15px;
`