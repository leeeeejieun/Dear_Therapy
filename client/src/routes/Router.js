import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element = {<HomePage />}/>
            <Route path="/main/*" element = {<MainPage />}/>
            <Route path="/login" element = {<LoginPage />} />
            <Route path="/register" element = {<RegisterPage />} />
        </Routes>
    )
};

export default Router;