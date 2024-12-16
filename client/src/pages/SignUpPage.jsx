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
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';

const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        "user_id": '',
        name: '',
        email: '',
        password: '',
    });

    const nextStep = async () => { 
        if (isStepValid) { 
            if (step === 5) { 
                navigate('/login');  
            } else if (step === 4) {
                {
                    try {
                        await registerUser(userData);
                        setUserData({})
                        setStep(5);
                    } catch (err) {
                        const errMessage = err.response.data.error.message;
                        alert(errMessage)
                    }
                }
            }
            else { 
                setStep((prevStep) => Math.min(prevStep + 1, 5)); 
            } 
        } 
    };

    const updateUserData = (key, value) => {
        setUserData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <SignUpPageContainer>
            {step !== 5 && <ProgressIndicator step={step} />}
            {step === 1 && (
                <>
                    <EmailInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('email', value)}/> 
                    <ContentContainer>
                        <Instructions step={1} />
                    </ContentContainer>
                </>
            )}
            {step === 2 && (
                <>
                    <IdInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('user_id', value)}/>
                    <ContentContainer>
                        <Instructions step={2} />
                    </ContentContainer>
                </>
            )}
            {step === 3 && (
                <>
                    <PwInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('password', value)}/>
                    <ContentContainer>
                        <Instructions step={3} />
                    </ContentContainer>
                </>
            )}
            {step === 4 && (
                <>
                    <NameInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('name', value)}/>
                    <ContentContainer>
                        <Instructions step={4} />
                    </ContentContainer>
                </>
            )}
            {step === 5 && <Completemsg />}
            <NextButton text={step === 5 ? "로그인 페이지로" : "다음"} onClick={nextStep} disabled={!isStepValid} />
        </SignUpPageContainer>
    );
};

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    width: 80%; 
`;

export default SignUpPage;
