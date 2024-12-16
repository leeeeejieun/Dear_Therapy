import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import DiaryPage from "pages/DiaryPage";
import HomePage from "pages/HomePage";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    )
};

export default Router;