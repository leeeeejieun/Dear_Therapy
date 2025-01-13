import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";

const DateNavigation = ({ currentDate, setIsMenu, setIsSaved, isSaved }) => {
  const [year, month, day] = currentDate.split("-");
  const date = `${year}년 ${month}월 ${day}일`; 
  
  const handelMenu = () => {
    setIsMenu(true);
  }

  return (
    <DateNavigationContainer>
      <DateText>{date}</DateText>
      {isSaved && <MenuIcon onClick={handelMenu}><FaEllipsisH  /></MenuIcon>}
    </DateNavigationContainer>
  );
};

export default DateNavigation;

const DateNavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const MenuIcon = styled.button`
  position: absolute;
  right: 1.5rem;
  background: none;
  font-size: 16.5px;
  color: black;
`;

const DateText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

