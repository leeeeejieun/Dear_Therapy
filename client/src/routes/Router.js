import React from "react";
import { Route, Routes } from "react-router-dom";
import DiaryPage from "pages/DiaryPage";

const Router = () => {
    return(
        <Routes>
            <Route path="/diary" element={<DiaryPage />}></Route>
        </Routes>
    )
};

export default Router;
