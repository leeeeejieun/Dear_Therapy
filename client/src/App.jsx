import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { GlobalStyle } from './styles/GlobalStyle';
import Router from 'routes/Router';

const App = () =>{

    return(
        <>   
            <ThemeProvider>
                <GlobalStyle />
                <Router  />   
            </ThemeProvider>
        </>
    );
};

export default App;
