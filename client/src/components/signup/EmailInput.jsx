import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const checkEmailDuplication = async () => {
        try {
            const response = await axios.get(`/users/${email}`);
            if (response.data.status === 200) {
                setError('');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error.message);
            } else {
                setError(err.response.data.error.message);
            }
        }
    };

    return (
        <EmailInputContainer>
            <Label>네이버 메일 주소를 입력해주세요</Label>
            <Input 
                type="email" 
                placeholder="이메일을 입력하세요" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <CheckButton onClick={checkEmailDuplication}>중복확인</CheckButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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

export default EmailInput;
