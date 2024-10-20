import React, {useState, useEffect} from "react";
import Router from 'routes/Router'; 
import GlobalStyle from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme }  from "styles/theme";
import DiaryPage from "pages/DiaryPage";

const App = () =>{
    return (
      <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
          <DiaryPage />
      </ThemeProvider>
      
    );
};

export default App;
