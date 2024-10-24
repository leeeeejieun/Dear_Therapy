import { createGlobalStyle } from "styled-components";
// 모든 브라우저에서 일괄적인 스타일링 제공
import reset from "styled-reset";

// 전역 스타일 컴포넌트
const GlobalStyle = createGlobalStyle`
   ${reset}
   
   @font-face {
      font-family: '금은보화';
      src: url('/fonts/geumeunbohwa.ttf') format('truetype');
   }

   @font-face {
      font-family:'빵구니맘';
      src: url('/fonts/bbang.ttf') format('truetype');
   }

   @font-face {
      font-family:'학교안심 그림일기';
      src: url('/fonts/school.ttf') format('truetype');
   }

   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   body {
    width: 100%;
    height: 100vh; 
    font-family: '학교안심 그림일기';
    background: ${({theme}) => theme.background};
   }

   a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
   }

   li { 
      list-style: none;
   }

   button {
      border: none;
      cursor: pointer;
   }

   img {
      cursor: pointer;
      width: auto;
      height: 100%;
   }

`;

export default GlobalStyle;