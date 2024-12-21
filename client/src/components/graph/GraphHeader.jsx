import styled from "styled-components";

const GraphHeader = ({dispatch, currentYear}) => {
    return(
        <Header>  
            <Button onClick={dispatch.handlePrevYear}>
                <img src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%BA%98%EB%A6%B0%EB%8D%94+%ED%97%A4%EB%8D%94+%EC%99%BC%EC%AA%BD+%ED%99%94%EC%82%B4%ED%91%9C.svg" alt="no svg" />
            </Button>
            <h1>{currentYear}년 월별 감정 통계</h1>
            <Button onClick={dispatch.handleNextYear}>
                <img src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EC%BA%98%EB%A6%B0%EB%8D%94+%ED%97%A4%EB%8D%94+%EC%98%A4%EB%A5%B8%EC%AA%BD+%ED%99%94%EC%82%B4%ED%91%9C.svg" alt="no svg" />
            </Button>
        </Header>
     );
};

export default GraphHeader;

const Header = styled.header`
    position: relative;
    top: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 18px;

    > h1 {
        font-size: 20px;
        font-weight: 500;
    }
`;

const Button = styled.button`
    background: none;
    width: 15px;
`