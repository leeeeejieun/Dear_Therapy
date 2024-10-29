import React from 'react';
import Title from 'components/common/Title';
import LoginLink from 'components/start/LoginLink';
import SignUpLink from 'components/start/SignUpLink';
import styled from 'styled-components';

const StartPage = () => (
  <StartPageContainer>
    <Title />
    <LoginLink />
    <SignUpLink />
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
