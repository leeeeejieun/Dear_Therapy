import React from 'react';
import styled from 'styled-components';
import { SlCalender } from "react-icons/sl";
import { BsBarChartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  return (
    <BottomNavigationContainer>
      <NavButton><BsBarChartFill /></NavButton>
      <NavButton><SlCalender /></NavButton>
      <NavButton><FaUser /></NavButton>
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