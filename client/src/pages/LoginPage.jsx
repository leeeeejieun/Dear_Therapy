import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import TitleContainer from 'components/TitleContainer';
import SignUpLinkContainer from 'components/SignUpLinkContainer';
import SignUpButton from 'components/SignUpButton';
import SignUpInput from 'components/SignUpInput';
import SpacerSignup from 'components/SpacerSignup';
import { Spacer1, Spacer2, Spacer3 } from 'components/SpacerSignup';

const LoginPage = () => {
  const SERVER_URL = 'http://localhost:4000/loginpage';
  const loginInfo = { user_id: '', password: '' };
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(loginInfo);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/login`, userData);
      if (response.status === 200) {
        const { accessToken } = response.data.success;
        localStorage.setItem('accessToken', accessToken);
        alert('로그인 성공!');
        setUser(response.data);
        navigate('/homepage');
      }
    } catch (err) {
      if (err.response.status === 401) {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      } else if (err.response.status === 500) {
        setError('서버 오류 발생');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Spacer1 />
      <TitleContainer />
      <Spacer2 />
      <InputContainer>
        <Label>ID:
          <SignUpInput 
            id="user_id" 
            type="text" 
            placeholder="아이디를 입력하세요" 
            value={userData.user_id} 
            onChange={handleChange} 
          />
        </Label>
        <Label>PW:
          <SignUpInput 
            id="password" 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            value={userData.password} 
            onChange={handleChange} 
          />
        </Label>
        <ImageBelowInput src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/box.PNG" alt="Box decoration" />
      </InputContainer>
      <SignUpButton onClick={handleSubmit}>
        로그인
        <ButtonImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob2.png" alt="Decoration below button" />
      </SignUpButton>
      <Spacer3 />
      <SignUpLinkContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/bg1.jpg") no-repeat center center fixed;
  //background-size: cover;
  border-radius: 15px;
  overflow: hidden;
  //position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  z-index: 10;
`;

const ImageBelowInput = styled.img`
  width: 310px;
  height: auto;
  position: relative;
  margin-top: -10px;
  z-index: 0;
  top: -180px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonImage = styled.img`
  width: 130px;
  height: auto;
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

export default LoginPage;
