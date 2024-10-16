import React, { useState } from 'react';
import styled from 'styled-components';

//날짜 

const DiaryDateNavigation = () => {

const DateNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CurrentDate = styled.div`
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #000;
  cursor: pointer;
  padding: 0 10px;
`;

}

export default DiaryDateNavigation;