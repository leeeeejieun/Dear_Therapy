import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const DateNavigation = ({ currentDate }) => {
  return (
    <DateNavigationContainer>
      <ArrowButton>{<SlArrowLeft />}</ArrowButton>
      <DateText>{currentDate}</DateText>
      <ArrowButton>{<SlArrowRight />}</ArrowButton>
    </DateNavigationContainer>
  );
};

export default DateNavigation;

const DateNavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const DateText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

