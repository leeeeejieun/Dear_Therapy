import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from 'images/bg1.jpg';
import titleImage from 'images/ob1.png'
import signUpImage from 'images/ob2.png'

const StartPage = () => {
  const SERVER_URL = 'http://localhost:4000/startpage';
    return (
      <Container>
       <TitleContainer>
        <Spacer /><Spacer /><Spacer />
        <Title>Dear Therapist</Title>
        <TitleImage src={titleImage} alt="Title decoration" />
      </TitleContainer>
        <Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer /><Spacer />
      <LinkButton to="/loginpage">아이디/비밀번호 로그인</LinkButton>
        <Spacer />
      <SignUpLinkContainer>
        <SignUpLink href="/signup">회원가입하기</SignUpLink>
        <SignUpImage src={signUpImage} alt="Sign up decoration" />
      </SignUpLinkContainer>
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
  position: relative;
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
`

const LinkButton = styled(Link)`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bt_green};
  border-radius: 5px;
  color: ${({ theme }) => theme.text_bt};
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.bt_darkbg};
  }
`;

const SignUpLinkContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_sat};
  z-index: 10;

  &:hover {
  }
`;

const SignUpImage = styled.img`
  margin-top: -33px;
  width: 125px;
  height: auto;
`;

export default StartPage