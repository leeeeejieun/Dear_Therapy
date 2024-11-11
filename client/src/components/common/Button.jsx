import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NextButton from 'components/signup/NextButton'; 

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@naver\.com$/; // 네이버 메일
        return emailPattern.test(email);
    };

    const checkEmailDuplication = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('네이버 메일 주소를 입력해주세요.');
            setIsValid(false);
            return;
        }
        try {
            const response = await axios.get(`http://3.37.65.136:4000/users/${email}`);
            if (response.data.status === 200) {
                setError('');
                setIsValid(true);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
                setError(err.response.data.error.message);
                setIsValid(false);
            } else {
                setError(err.response.data.error.message);
                setIsValid(false);
            }
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
                <CheckButton onClick={checkEmailDuplication}>중복확인</CheckButton>
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isValid} />
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
    width: 80%;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    font-family: inherit;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.text_bt};
    width: 100%;
    margin-bottom: 10px;
    border-radius: 25px;
    color: ${(props) => props.theme.text};
    &.error { 
        border: 1px solid ${(props) => props.theme.text_warn}; 
    }
`;

const CheckButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    padding: 5px 10px;
    font-size: 14px;
    font-family: inherit;
    color: ${(props) => props.theme.text_bt};
    background: ${(props) => props.theme.bt_green};
    border: none;
    border-radius: 15px;
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
