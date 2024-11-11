import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import EmailInput from 'components/signup/EmailInput';
import IdInput from 'components/signup/IdInput';
import PwInput from 'components/signup/PwInput';
import NameInput from 'components/signup/NameInput';
import Completemsg from 'components/signup/Completemsg';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';
import Instructions from 'components/signup/Instructions';

const SignUpPage = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 5));
    const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

    return (
        <SignUpPageContainer>
            <ProgressIndicator step={step} />
            {step === 1 && (
                <>
                    <EmailInput />
                    <Instructions step={1} />
                </>
            )}
            {step === 2 && (
                <>
                    <IdInput />
                    <Instructions step={2} />
                </>
            )}
            {step === 3 && (
                <>
                    <PwInput />
                    <Instructions step={3} />
                </>
            )}
            {step === 4 && (
                <>
                    <NameInput />
                    <Instructions step={4} />
                </>
            )}
            {step === 5 && <Completemsg />}
            <NavigationButtons>
                {step > 1 && <button onClick={prevStep}>이전</button>}
                <NextButton text={step === 5 ? "로그인 페이지로" : "다음"} onClick={nextStep} />
            </NavigationButtons>
        </SignUpPageContainer>
    );
};

const NavigationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 20px;
`;

export default SignUpPage;
