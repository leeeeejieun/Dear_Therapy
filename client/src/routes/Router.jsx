import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/signuppage" element={<SignUpPage />} />
        </Routes>
    )
};

export default Router;