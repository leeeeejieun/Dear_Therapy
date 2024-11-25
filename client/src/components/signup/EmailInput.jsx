import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { checkEmailDuplication } from 'api/email'; 
import NextButton from 'components/signup/NextButton'; 

const EmailInput = ({ setIsStepValid, nextStep }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isValid, setIsValid] = useState(false);  

    useEffect(() => { 
        setIsStepValid(isEmailValid); 
        setIsValid(isEmailValid);  
    }, [isEmailValid, setIsStepValid]);

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@naver\.com$/; // 네이버 메일
        return emailPattern.test(email);
    };

    const handleEmailDuplication = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('네이버 메일 주소를 입력해주세요.');
            setIsEmailValid(false);
            return;
        }
        try {
            const data = await checkEmailDuplication(email);
            if (data.status === 200) {
                setError('');
                setIsEmailValid(true);
            }
        } catch (err) {
            setError(err.response?.data?.error?.message);
            setIsEmailValid(false);
        }
    };

    return (
        <EmailInputContainer>
            <Label>네이버 메일 주소를 입력해주세요</Label>
            <InputWrapper>
                <Input 
                    type="email" 
                    placeholder="이메일을 입력하세요" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? 'error' : ''} 
                />
                <CheckButton onClick={handleEmailDuplication}>중복확인</CheckButton>
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isValid} onClick={nextStep} />
            </NextButtonWrapper>
        </EmailInputContainer>
    );
};

const EmailInputContainer = styled.div`
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

const InputWrapper = styled.div`
    position: relative;
    width: 80%; // 부모 컴포넌트의 너비
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    font-family: inherit;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.text_bt};
    width: 100%; 
    border-radius: 25px;
    color: ${(props) => props.theme.text};
    &.error { 
        border: 1px solid ${(props) => props.theme.text_warn}; 
    }
`;

const CheckButton = styled.button`
    position: absolute;
    right: 3px; 
    top: 50%;
    transform: translateY(-50%);
    padding: 8px 18px;
    font-size: 16px;
    font-family: inherit;
    color: ${(props) => props.theme.text_bt};
    background: ${(props) => props.theme.bt_green};
    border: none;
    border-radius: 25px;
    cursor: pointer;
    &:hover {
        background: ${(props) => props.theme.bt_green};
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

export default EmailInput;
