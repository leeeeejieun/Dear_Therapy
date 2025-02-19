import ReactDOM from "react-dom";
import styled from "styled-components";

const Loading = () => {
    return ReactDOM.createPortal(
        <LoadingContainer>
            <Image src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EB%A1%9C%EB%94%A9+%EC%8A%A4%ED%94%BC%EB%84%88.gif" alt="로딩 중"/>
        </LoadingContainer>
    , document.getElementById("loading"));
};

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0.3);
`;

const Image = styled.img`
    width: 3%;
`

export default Loading;