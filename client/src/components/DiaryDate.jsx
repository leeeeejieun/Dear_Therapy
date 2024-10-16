import React, { useState } from 'react';
import styled from 'styled-components';

//날짜 

const diaryDate = () => {

const dateNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const currentDate = styled.div`
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

const navButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #000;
  cursor: pointer;
  padding: 0 10px;
`;

}

export default diaryDate;