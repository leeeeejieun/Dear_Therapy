import React from 'react';
import Title from 'components/common/Title';
import LoginLink from 'components/start/LoginLink';
import AuthLink from 'components/common/AuthLink';
import styled from 'styled-components';

const StartPage = () => (
  <StartPageContainer>
    <Title />
    <LoginLink />
    <AuthLink link="/signUp" linkType="signUp" text="회원가입하기"/>
  </StartPageContainer>
)

export default StartPage;

const StartPageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/bg1.jpg");
    overflow: hidden;
`;  
