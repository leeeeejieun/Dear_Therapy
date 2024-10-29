import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpLink = () => {
    return (
        <StyledLink to="signup">
            <SignUpText>회원가입하기</SignUpText>
            <SignUpImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob2.png" alt="Sign up decoration" />
        </StyledLink>
    );
}

export default SignUpLink;

const StyledLink  = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom: 20px;
    width: 140px; 
    height: 60px;
`;

const SignUpText = styled.span`
    position: absolute; 
    font-size: 14px;
    color: ${(props) => props.theme.text};
    z-index: 1; 
`;

const SignUpImage = styled.img`
    position: absolute;
    top: 0;
`;
