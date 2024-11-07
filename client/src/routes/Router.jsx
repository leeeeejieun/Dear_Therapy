import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage";
import DiaryPage from "pages/DiaryPage";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/diary" element={<DiaryPage />} />
        </Routes>
    )
};

export default Router;