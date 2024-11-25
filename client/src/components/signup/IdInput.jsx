import React, { useState } from 'react';
import styled from 'styled-components';
import { checkIdDuplication } from 'api/id'; 
import NextButton from 'components/signup/NextButton'; 

const IdInput = ({ nextStep, setIsStepValid }) => {
    const [user_id, setUserId] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateId = (user_id) => {
        const idPattern = /^[a-z0-9]{3,15}$/; // 소문자와 숫자만, 3-15자
        return idPattern.test(user_id);
    };

    const handleIdDuplication = async (e) => {
        e.preventDefault();
        if (!validateId(user_id)) {
            setError('아이디는 영문 소문자와 숫자만 포함되어야 하며, 3-15자 사이여야 합니다.');
            setIsValid(false);
            setIsStepValid(false);
            return;
        }

        try {
            const data = await checkIdDuplication(user_id);
            if (data.status === 200) {
                setError('');
                setIsValid(true);
                setIsStepValid(true);
            }
        } catch (err) {
            setError(err.response?.data?.error?.message);
            setIsValid(false);
            setIsStepValid(false);
        }
    };

    return (
        <IdInputContainer>
            <Label>사용할 아이디를 입력해주세요</Label>
            <InputWrapper>
                <Input 
                    type="text" 
                    placeholder="아이디를 입력하세요" 
                    value={user_id} 
                    onChange={(e) => setUserId(e.target.value)}
                    className={error ? 'error' : ''} 
                />
                <CheckButton onClick={handleIdDuplication}>중복확인</CheckButton>
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <NextButtonWrapper>
                <NextButton disabled={!isValid} onClick={nextStep} /> 
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
    border-radius: 25px;
    color: ${(props) => props.theme.text};
    &.error { 
        border: 1px solid ${(props) => props.theme.text_warn}; 
    }
`;

const CheckButton = styled.button`
    position: absolute;
    right: 10px;
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

export default IdInput;
