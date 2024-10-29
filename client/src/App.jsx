import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from "styles/GlobalStyle";
import { AppWrapper } from 'styles/AppWrapper';
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { UserProvider } from "contexts/UserContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AppWrapper>
          <GlobalStyle />
          <Router />
        </AppWrapper>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
