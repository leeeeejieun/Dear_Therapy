import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage"

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
        </Routes>
    )
};

export default Router;