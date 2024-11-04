import React from 'react';
import styled from 'styled-components';

const Completemsg = () => {
    return (
        <CompleteContainer>
            <CheckImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/signup_check.png" alt="초록색 체크" />
            <Message>회원가입 완료!</Message>
        </CompleteContainer>
    );
};

const CompleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 130px;
    align-items: center;
    height: auto;
    text-align: center;
`;

const CheckImage = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
`;

const Message = styled.h1`
    font-size: 24px;
    color: ${(props) => props.theme.text};
`;

export default Completemsg;
