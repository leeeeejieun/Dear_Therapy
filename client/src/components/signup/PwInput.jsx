import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NextButton from 'components/signup/NextButton'; 

const PwInput = ({ nextStep, setIsStepValid, saveData }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

    useEffect(() => { 
        setIsStepValid(isPasswordValid && isConfirmPasswordValid); 
    }, [isPasswordValid, isConfirmPasswordValid, setIsStepValid]);

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/; // 영문과 숫자가 혼용, 8자 이상
        return passwordPattern.test(password);
    };

    const handlePwChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        saveData(newPassword);
        if (!validatePassword(newPassword)) {
            setError('비밀번호는 영문과 숫자가 혼용되어야 하며, 8자 이상이어야 합니다.');
            setIsPasswordValid(false);
            setIsStepValid(false);
        } else {
            setError('');
            setIsPasswordValid(true);
            setIsStepValid(true);
        }
    };

    const handleConfirmPwChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setError('비밀번호가 일치하지 않습니다.');
            setIsConfirmPasswordValid(false);
            setIsStepValid(false);
        } else {
            setError('');
            setIsConfirmPasswordValid(true);
            setIsStepValid(true);
        }
    };

    const isFormValid = isPasswordValid && isConfirmPasswordValid;

    return (
        <PwInputContainer>
            <Label>비밀번호를 입력해주세요</Label>
            <Input 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                value={password} 
                onChange={handlePwChange}
                className={!isPasswordValid ? 'error' : ''} 
            />
            <Input 
                type="password" 
                placeholder="비밀번호를 한 번 더 입력하세요" 
                value={confirmPassword}
                onChange={handleConfirmPwChange}
                className={!isConfirmPasswordValid ? 'error' : ''} 
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isFormValid} onClick={nextStep} /> 
            </NextButtonWrapper>
        </PwInputContainer>
    );
};

const PwInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-size: 16px;
    margin-top: 50px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    font-family: inherit;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.text_bt};
    width: 80%;
    margin-bottom: 5px; // 입력창 사이 거리 조정!
    border-radius: 25px;
    color: ${(props) => props.theme.text};
    &.error { 
        border: 1px solid ${(props) => props.theme.text_warn}; 
    }
`;

const ErrorMessage = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: ${(props) => props.theme.text_warn};
`;

const NextButtonWrapper = styled.div`
    margin-top: 20px; 
    margin-left: 20px;
`;

export default PwInput;
