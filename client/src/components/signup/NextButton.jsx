import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button'; 

const NextButton = () => {
    const [step, setStep] = useState(1);

    const getNextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            window.location.href = '/login';
        }
    };

    const getButtonText = () => {
        return step === 5 ? '로그인 페이지로' : '다음';
    };

    return (
        <ButtonWrapper>
            <Button 
                buttonType="next" 
                text={getButtonText()} 
                onClick={getNextStep} 
            />
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    margin-top: 20px; 
    margin-left: 20px;
`;

export default NextButton;
