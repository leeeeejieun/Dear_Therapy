import React from 'react';
import styled from 'styled-components';
import { SlCalender } from "react-icons/sl";
import { BsBarChartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  return (
    <BottomNavigationContainer>
    <NavButton><BsBarChartFill /></NavButton>
    <NavButton size="30px"  transform="translateY(3%)"><SlCalender /></NavButton>
    <NavButton><FaUser /></NavButton>
  </BottomNavigationContainer>
  );
};

export default BottomNavigation;

const BottomNavigationContainer = styled.div`
  margin-top: 10px;
  position: absolute;
  right: 0.5px;
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  width: 100%; 
  height: 10%;
  padding: 15px;
  background-image: url(${process.env.PUBLIC_URL}/images/1.png);
  background-size: cover;
  border: 2px dashed black;    
  border-radius: 10px 10px 0 0 ;  
  bottom: 0;  
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;