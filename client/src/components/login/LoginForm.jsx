import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "components/common/Input";
import Button from "components/common/Button";
import ErrorMessage from "./ErrorMessage";
import UserContext from 'contexts/UserContext';
import { postLogin } from "api/login";
import styled from "styled-components";

const LoginForm = () => {
    const loginInfo = { user_id: '', password: '' };
    const [userData, setUserData] = useState(loginInfo);
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postLogin(userData);
            const { accessToken } = response.data.success;
            localStorage.setItem('accessToken', accessToken);
            setUser(userData.user_id);
            navigate("/home"); 
        } catch(err) {
            if(err.response && err.response.status === 401) {
                setError(err.response.data.error.message);
            }
        };
    };

    return(
        <FormContainer onSubmit={handleSubmit}>
            <InputContainer>
                <Label htmlFor="user_id">ID:
                    <Input 
                        id="user_id"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        value={userData.user_id}
                        setState={setUserData}
                        setError={setError}
                    />
                </Label>
                <Label htmlFor="password">PW:
                    <Input 
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={userData.password}
                        setState={setUserData}
                        setError={setError}
                    />
                </Label>
                <ErrorMessage message={error}/>
            </InputContainer>
            <Button buttonType="login" text="로그인"/>
        </FormContainer>
    );
};

export default LoginForm;

const FormContainer = styled.form`
    display: flex;
    align-items: center; 
    justify-content: center;
    position: absolute;
    top: 35%;
    width: 280px;
    height: 300px;
    background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/box.PNG") no-repeat center center;
    background-size: cover; 
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
    width: 85%;
    height: 150px;
    gap: 20px;
`

const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    font-size: 20px;
    gap: 20px;
   
`

