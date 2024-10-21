import React from 'react';
import Router from 'routes/Router'; 
import GlobalStyle from "styles/GlobalStyle";
import AppWrapper from "styles/AppWrapeer";
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";

const App = () =>{
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
