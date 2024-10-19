import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from 'images/bg1.jpg';
import titleImage from 'images/ob1.png';
import boxImage from 'images/box.PNG';
import ob2Image from 'images/ob2.png';
import UserContext, { UserProvider } from 'contexts/UserContext';

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
        <TitleContainer>
        <Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer />
          <Title>Dear Therapist</Title>
          <TitleImage src={titleImage} alt="Title decoration" />
        </TitleContainer>
        <Spacer />
        <InputContainer>
          <Label>ID:
            <Input type="text" placeholder="아이디를 입력하세요" />
          </Label>
          <Label>PW:
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Label>
          <ImageBelowInput src={boxImage} alt="Box decoration" />
        </InputContainer>
        <Spacer />
        <Button>
          로그인
          <ButtonImage src={ob2Image} alt="Decoration below button" />
        </Button>
        <Spacer />
      </Container>
    );  
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
background: url(${backgroundImage}) no-repeat center center fixed;
border-radius: 15px; 
overflow: hidden;
`;

const TitleContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`;

const Title = styled.h1`
font-size: 40px;
color: ${({ theme }) => theme.text};
margin: 0;
z-index: 10;
`;

const TitleImage = styled.img`
margin-top: -115px; 
width: 350px;
height: auto;
`

const Spacer = styled.div`
  height: 20px;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  z-index: 10;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px; 
  border: none; 
  width: 80%;
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

const Button = styled.button`
  background: none;
  border: none;
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  position: relative;
  left: 90px;
  top: -250px;
  cursor: pointer;
  transform: rotate(-3deg);
  z-index: 20;
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
