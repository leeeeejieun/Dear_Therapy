import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginLink = () => {
  return(
    <StyledLink to="/login">아이디/비밀번호 로그인</StyledLink>
  );
};


export default LoginLink;

const StyledLink = styled(Link)`
    position: absolute;
    bottom: 20%;
    padding: 10px 20px;
    width: 300px;
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    text-align: center;
    border: 3px dashed ${(props) => props.theme.line1};
    border-radius: 12px;
    background-color: rgba(248, 243, 233, 0.418);

    &:hover {
      background-color: ${(props) => props.theme.bt_darkbg};
    }
`;
