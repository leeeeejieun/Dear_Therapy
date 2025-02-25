import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "pages/StartPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import DiaryPage from "pages/DiaryPage";
import EmotionAnalysisPage from "pages/EmotionAnalysisPage";
import HomePage from "pages/HomePage";
import GraphPage from "pages/GraphPage";
import ProfilePage from "pages/ProfilePage";
import Kakao from "components/login/KaKao";


const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/analysis" element={<EmotionAnalysisPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/oauth/callback/kakao" element={<Kakao />}/>
            <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
    )
};

export default Router;