import React from 'react';
import Router from 'routes/Router'; 
import GlobalStyle from "styles/GlobalStyle";
import { AppWrapper } from 'styles/AppWrapper';
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";

const App = () =>{
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <GlobalStyle />
            <Router />
        </AppWrapper>
    </ThemeProvider>
    );
};

export default App;
