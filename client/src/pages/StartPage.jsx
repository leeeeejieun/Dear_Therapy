import React from 'react';
import TitleContainer from 'components/TitleContainer';
import SignUpLinkContainer from 'components/SignUpLinkContainer';
import LinkButton from 'components/LinkButton';
import { Spacer1, Spacer2, Spacer3 } from 'components/Spacer';
import Container from 'components/StartPageContainer';

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

export default StartPage;
