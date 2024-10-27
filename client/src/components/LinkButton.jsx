import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkButton = styled(Link)`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  width: 300px;
  display: inline-block;
  border: 3px dashed ${({ theme }) => theme.line1};
  border-style: dashed;
  border-radius: 12px;
  background-color: rgba(248, 243, 233, 0.418);
  &:hover {
    background-color: ${({ theme }) => theme.bt_darkbg};
  }
`;

export default LinkButton;