import styled from 'styled-components';

const SignUpButton = styled.button`
  background: none;
  border: none;
  margin: 10px 0;
  padding: 12px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  position: relative;
  left: 90px;
  top: -250px;
  cursor: pointer;
  transform: rotate(-3deg);
  z-index: 20;
  font-family: '학교안심 그림일기', sans-serif;
`;

export default SignUpButton;
