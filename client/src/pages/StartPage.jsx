import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TitleContainer from 'components/TitleContainer';
import SignUpLinkContainer from 'components/SignUpLinkContainer';
import { Spacer1, Spacer2, Spacer3 } from 'components/Spacer';

const StartPage = () => (
  <Container>
    <Spacer1 />
    <TitleContainer />
    <Spacer2 />
    <LinkButton to="/loginpage">아이디/비밀번호 로그인</LinkButton>
    <Spacer3 />
    <SignUpLinkContainer />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/bg1.jpg") no-repeat center center fixed;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const LinkButton = styled(Link)`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  width: 300px;
  display: inline-block;
  border: 3px dashed ${({ theme }) => theme.line1};
  border-style: dashed;
  border-radius: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.bt_darkbg};
  }
`;

export default StartPage;
