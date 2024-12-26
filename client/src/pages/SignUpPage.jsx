import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import EmailInput from 'components/signup/EmailInput';
import IdInput from 'components/signup/IdInput';
import PwInput from 'components/signup/PwInput';
import NameInput from 'components/signup/NameInput';
import CompleteMsg from 'components/signup/Completemsg';
import Button from 'components/common/Button'; 
import Instructions from 'components/signup/Instructions';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';

const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        user_id: '',
        name: '',
        email: '',
        password: '', 
    });

    const nextStep = async () => { 
        if (isStepValid) { 
            if (step === 5) { 
                navigate('/login');  
            } else if (step === 4) {
                try {
                    await registerUser(userData);
                    setUserData({})
                    setStep(5);
                } catch (err) {
                    console.log(err.response.data.error.message);
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
                    <Instructions step={1} />
                </>
            )}
            {step === 2 && (
                <>
                    <IdInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('user_id', value)}/>
                    <Instructions step={2} />
                    
                </>
            )}
            {step === 3 && (
                <>
                    <PwInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('password', value)}/>
                    <Instructions step={3} />
                    
                </>
            )}
            {step === 4 && (
                <>
                    <NameInput setIsStepValid={setIsStepValid} nextStep={nextStep} saveData={(value) => updateUserData('name', value)}/>
                    <Instructions step={4} />
                </>
            )}
            {step === 5 && <CompleteMsg />}
            <Button buttonType="next" text={step === 5 ? "로그인 페이지로" : "다음"} onClick={nextStep} disabled={!isStepValid} />
        </SignUpPageContainer>
    );
};


const SignUpPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px; 
  gap: 20px; 
  width: 100%;
  margin-top: 90px;
`;

export default SignUpPage;
