import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpLinkContainer = () => (
  <Container>
    <SignUpLink to="/signup">회원가입하기</SignUpLink>
    <SignUpImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob2.png" alt="Sign up decoration" />
  </Container>
);

const Container = styled.div`
  position: relative;
  bottom: -10px;
  right: -130px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.bt_green};
  }
`;

const SignUpImage = styled.img`
  margin-top: -33px;
  width: 125px;
  height: auto;
`;

export default SignUpLinkContainer;
