import React, {useState, useEffect} from "react";
import Router from 'routes/Router'; 
import GlobalStyle from "styles/GlobalStyle";
import { AppWrapper } from 'styles/AppWrapper';
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";
import DiaryPage from "pages/DiaryPage";

const App = () =>{
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <GlobalStyle />
            <Router />
            <DiaryPage />
        </AppWrapper>
    </ThemeProvider>
    );
};

export default App;
