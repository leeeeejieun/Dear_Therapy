import React  from 'react';
import ReactDOM from 'react-dom/client';           
import { BrowserRouter } from 'react-router-dom';  
import App from './App';
<<<<<<< HEAD


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
=======
import "styles/font.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> develop
);