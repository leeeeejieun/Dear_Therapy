import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { FaCalendarCheck } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  return (
    <BottomNavigationContainer>
      <NavButton to="/graph"><BsBarChartFill /></NavButton>
      <NavButton to="/home"><FaCalendarCheck /></NavButton>
      <NavButton to="/profile"><FaUser /></NavButton>
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
  background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/2.png");
  background-size: cover;
  border: 2px dashed black;    
  border-radius: 10px 10px 0 0 ;  
  bottom: 0;  
`;

const NavButton = styled(Link)`
  background: none;
  font-size: 24px;
  color: black;
`;