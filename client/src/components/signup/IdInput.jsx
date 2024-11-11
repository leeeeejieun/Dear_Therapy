import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NextButton from 'components/signup/NextButton'; 

const IdInput = () => {
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateId = (id) => {
        const idPattern = /^[a-z0-9]{3,15}$/; // 소문자와 숫자만, 3-15자
        return idPattern.test(id);
    };

    const checkIdDuplication = async (e) => {
        e.preventDefault();
        if (!validateId(id)) {
            setError('아이디는 영문 소문자과 숫자만 포함되어야 하며, 3-15자 사이여야 합니다.');
            setIsValid(false);
            return;
        }

        try {
            const response = await axios.get(`http://3.37.65.136:4000/users/${id}`);
            if (response.data.status === 200) {
                setError('');
                setIsValid(true);
            }
        } catch (err) {
            setError(err.response.data.error.message);
            setIsValid(false);
        }
    };

    return (
        <IdInputContainer>
            <Label>사용할 아이디를 입력해주세요</Label>
            <Input 
                type="text" 
                placeholder="아이디를 입력하세요" 
                value={id} 
                onChange={(e) => setId(e.target.value)}
                className={error ? 'error' : ''} 
            />
            <CheckButton onClick={checkIdDuplication}>중복확인</CheckButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isValid} />
            </NextButtonWrapper>
        </IdInputContainer>
    );
};

const IdInputContainer = styled.div`
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

const CheckButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-family: inherit;
    color: ${(props) => props.theme.text_bt};
    background: ${(props) => props.theme.bt_green};
    border: none;
    border-radius: 5px;
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

export default IdInput;
