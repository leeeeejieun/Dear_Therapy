import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button'; 

const NextButton = () => {
    const navigate = useNavigate();

    return (
        <ButtonWrapper>
            <Button 
                buttonType="next" 
                text="다음" 
                onClick={() => navigate('/SignUpPagetwo')} 
            />
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    margin-top: 20px; 
    margin-left: 20px;
`;

export default NextButton;
