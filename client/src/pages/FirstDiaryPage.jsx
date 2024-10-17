import react, {useState} from "react";
import styled from "styled-components";
import DiaryContainer from "../components/DiaryContainer";
import DiaryDate from "../components/DiaryDate";


const FirstDiaryPage = () => {
    return (
        <>
           <DiaryContainer></DiaryContainer>
           <DiaryDate></DiaryDate>
        </>
      );
}

export default FirstDiaryPage;