import React from 'react';
import styled from 'styled-components';
import { SlCalender } from "react-icons/sl";
import { SlChart } from "react-icons/sl"
import { SlUser } from "react-icons/sl"

const BottomNavigation = () => {
  return (
    <BottomNavigationContainer>
      <NavButton><SlChart /></NavButton>
      <NavButton><SlCalender /></NavButton>
      <NavButton><SlUser /></NavButton>
    </BottomNavigationContainer>
  );
};

export default BottomNavigation;

const BottomNavigationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-image: url(${process.env.PUBLIC_URL}/images/1.png);
  background-size: cover;

`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;