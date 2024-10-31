import React from "react";
import styled from "styled-components";

const Title = () => {
    return (
        <TitleContainer>
            <TitleText>Dear Therapist</TitleText>
        </TitleContainer>
    );
};

export default Title;

const TitleContainer = styled.div`
    position: relative;
    top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 170px;
    background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob1.png") no-repeat center center; 
    background-size: cover;
`;

const TitleText = styled.h1`
    position: absolute;
    font-size: 45px;
    color: ${(props) => props.theme.text};
    transform: translateY(-30%);
    letter-spacing: -1px;
    font-weight: 600;
    font-family: '빵구니맘', sans-serif;
    z-index: 1; 
`;
