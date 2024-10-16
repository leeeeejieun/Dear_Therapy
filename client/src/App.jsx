import React from "react";
import Container from "./components/DiaryContainer"
import DateNavigation from "./components/DiaryNavigation"

const App = () =>{
  return (
    <>
       <DiaryContainer></DiaryContainer>
       <DiaryDateNavigation></DiaryDateNavigation>
    </>
  );
}  



export default App;
