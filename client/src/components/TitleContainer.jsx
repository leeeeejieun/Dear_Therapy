import React from 'react';
import styled from 'styled-components';
import titleImage from 'images/ob1.png';

const TitleContainer = () => (
  <Container>
    <Spacer />
    <Title>Dear Therapist</Title>
    <TitleImage src={titleImage} alt="Title decoration" />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Spacer = styled.div`
  height: 60px;
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
`;

export default TitleContainer;
