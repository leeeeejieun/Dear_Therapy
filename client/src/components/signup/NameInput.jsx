import React, { useState } from 'react';
import styled from 'styled-components';

const NameInput = ({ setIsStepValid,saveData }) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const validateNickname = (nickname) => {
        return nickname.length >= 1 && nickname.length <= 8; // 닉네임 8자 이하
    };

    const handleNicknameChange = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        saveData(newNickname);
        if (!validateNickname(newNickname)) {
            setError('닉네임은 1자 이상, 8자 이하여야 합니다.');
            setIsStepValid(false);
        } else {
            setError('');
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

export default NameInput;
