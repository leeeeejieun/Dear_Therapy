import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";
import StartPage from './pages/StartPage'; 

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StartPage />  // 원하는 컴포넌트를 사용
      <Router />
    </ThemeProvider>
  );
};

export default App;
