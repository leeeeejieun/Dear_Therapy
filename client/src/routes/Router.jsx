import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import SignUpPagetwo from "pages/SignUpPagetwo";
import SignUpPagethree from "pages/SignUpPagethree";
import SignUpPagefour from "pages/SignUpPagefour";
import SignUpPagecomplete from "pages/SignUpComplete";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/signuppagetwo" element={<SignUpPagetwo />} />
            <Route path="/signuppagethree" element={<SignUpPagethree />} />
            <Route path="/signuppagefour" element={<SignUpPagefour />} />
            <Route path="/SignUpPagecomplete" element={<SignUpPagecomplete />} />
        </Routes>
    )
};

export default Router;