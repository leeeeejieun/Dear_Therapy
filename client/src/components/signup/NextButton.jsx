import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/common/Button'; 

const NextButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getNextPage = () => {
        switch (location.pathname) {
            case '/signUp':
                return '/SignUpPagetwo';
            case '/SignUpPagetwo':
                return '/SignUpPagethree';
            case '/SignUpPagethree':
                return '/SignUpPagefour';
            case '/SignUpPagefour':
                return '/SignUpPagecomplete';
            case '/SignUpPageComplete':
                return '/LoginPage';
            default:
                return '/SignUp'; // 기본값
        }
    };

    const getButtonText = () => {
        if (location.pathname === '/SignUpPagecomplete') {
            return '로그인 페이지로';
        }
        return '다음';
    };

    return (
        <ButtonWrapper>
            <Button 
                buttonType="next" 
                text={getButtonText()} 
                onClick={() => navigate(getNextPage())} 
            />
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    margin-top: 20px; 
    margin-left: 20px;
`;

export default NextButton;
