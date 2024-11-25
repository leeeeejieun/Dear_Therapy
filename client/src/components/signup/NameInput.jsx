import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NextButton from 'components/signup/NextButton'; 

const NameInput = ({ nextStep, setIsStepValid }) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => { 
        setIsStepValid(isValid); 
    }, [isValid, setIsStepValid]);

    const validateNickname = (nickname) => {
        return nickname.length >= 1 && nickname.length <= 8; // 닉네임 8자 이하
    };

    const handleNicknameChange = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        if (!validateNickname(newNickname)) {
            setError('닉네임은 1자 이상, 8자 이하여야 합니다.');
            setIsValid(false);
            setIsStepValid(false);
        } else {
            setError('');
            setIsValid(true);
            setIsStepValid(true);
        }
    };

    return (
        <NameInputContainer>
            <Label>닉네임을 정해주세요</Label>
            <Input 
                type="text" 
                placeholder="닉네임을 입력하세요" 
                value={nickname} 
                onChange={handleNicknameChange}
                className={error ? 'error' : ''} 
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isValid} onClick={nextStep} />
            </NextButtonWrapper>
        </NameInputContainer>
    );
};

const NameInputContainer = styled.div`
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
    margin-bottom: 10px;
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

export default NameInput;
