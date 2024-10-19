import React from 'react';
import styled from 'styled-components'
import backgroundImage from '../images/bg1.jpg';
import titleImage from '../images/ob1.png'

const StartPage = () => {
    return (
      <Container>
        <Title>Dear Therapist
        <TitleImage src={titleImage} alt="Title decoration" /> </Title>
        <Spacer />
        <Button>아이디/비밀번호 로그인</Button>
        <Spacer />
        <SignUpLink href="/signup">회원가입하기</SignUpLink>
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

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  position: relative;
  z-index: 100;
`;

const TitleImage = styled.img`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px; 
  height: auto;
`

const Spacer = styled.div`
  height: 20px; 
`

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bt_green};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text_bt};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.bt_darkbg};
  }
`;

const SignUpLink = styled.a`
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_sat};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default StartPage