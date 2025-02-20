import { Link } from 'react-router-dom';
import styled from 'styled-components';
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const LoginLink = () => {

  const handleKaKaoLogin = () => {
    window.location.href = kakaoURL; // 로그인 창 열기
  };

  return(
    <LinkContainer>
      <StyledLink to="/login">아이디/비밀번호 로그인</StyledLink>
      <KaKaoButton onClick={handleKaKaoLogin} />
    </LinkContainer>
  );
};


export default LoginLink;

const LinkContainer = styled.div`
   position: absolute;
   display: flex;
   flex-direction: column;
   bottom: 20%;
   width: 300px;
   gap: 20px;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  text-align: center;
  border: 3px dashed ${(props) => props.theme.line1};
  background-color: rgba(248, 243, 233, 0.418);
  border-radius: 12px;
  &:hover {
    background-color: ${(props) => props.theme.bt_darkbg};
  }
`;

const KaKaoButton = styled.button`
  width: 100%;
  height: 50px;
  background: url("https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%B9%B4%EC%B9%B4%EC%98%A4+%EB%A1%9C%EA%B7%B8%EC%9D%B8+%EB%B2%84%ED%8A%BC+%EC%9D%B4%EB%AF%B8%EC%A7%80");
  background-repeat: no-repeat;
`
