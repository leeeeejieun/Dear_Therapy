import styled from "styled-components";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const DateNavigation = ({ currentDate }) => {
  const [year, month, day] = currentDate.split("-");
  const date = `${year}년 ${month}월 ${day}일`; 

  return (
    <DateNavigationContainer>
      <ArrowButton>{<SlArrowLeft />}</ArrowButton>
      <DateText>{date}</DateText>
      <ArrowButton>{<SlArrowRight />}</ArrowButton>
    </DateNavigationContainer>
  );
};

export default DateNavigation;

const DateNavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

const ArrowButton = styled.button`
  background: none;
  font-size: 20px;
  color: black;
`;

const DateText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

