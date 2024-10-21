import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";
import { UserProvider } from "contexts/UserContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <GlobalStyle />
      <Router />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
