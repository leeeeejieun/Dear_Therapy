import { useState, useEffect, useContext } from "react";
import { getAnalysis  } from "api/analysis";
import UserContext from "contexts/UserContext";
import styled from "styled-components";


const AnalysisResult = ({date}) => {
    const { user } = useContext(UserContext);
    const [analysisData, setAnalysisData] = useState("");

    useEffect(() => {
        getEmotionAnalysis();
    }, []);
 
    const getEmotionAnalysis = async () => {
        try {
            const response = await getAnalysis(
                {
                    user_id : user,
                    date: date,
                }
            );
        if(response.status === 200) {
            setAnalysisData(response.data.success);
            
        }
        } catch(err) {
            console.log(err.response.data.error);
        }
    }

    const { comment, text, image, emotion, score, feedback } = analysisData;
    const description = text ? text.split(":")[1] : "";
    
    return(
       <ResultContainer>
            <ImageContainer>
                <RecommendationImage src={image} alt="추천 정보 이미지" />
            </ImageContainer>
            <TextContainer>
                <RecommendationText>
                    <Title>
                        <h1>오늘의 감정 상태</h1>
                        <p>📝</p>
                    </Title>
                    <Description style={{padding:"5px 0"}}>{`${emotion}, ${score}점`}</Description>
                    <Description>{feedback}</Description>
                </RecommendationText>
                <RecommendationText>
                    <Title> 
                        <h1>오늘의 추천 정보</h1>
                        <p>✨</p>
                    </Title>
                    <Description>{description}</Description>
                </RecommendationText>
                <RecommendationText style={{ animationDelay: "0.5s" }}>
                    <Title>
                        <h1>오늘의 코멘트</h1>
                        <p>🍀</p>
                    </Title>
                    <Description>{comment}</Description>
                </RecommendationText>
            </TextContainer>
       </ResultContainer>
    );  
};

export default AnalysisResult;

const ResultContainer = styled.div`
    position: relative;
    top: 3.5rem;
    margin-bottom: 5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: -1;
` ;

const ImageContainer = styled.div`
    margin: 0 auto;
    width: 65%;
`

const RecommendationImage =  styled.img`
   border-radius: 15px;
   border: 2px dashed #ccc;

`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 1.3rem;
`

const RecommendationText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 7.5rem;
    background-color: #FFFF;
    border-radius: 20px;
    padding: 12px;
    animation:slide-top 1s cubic-bezier(.25,.46,.45,.94) both;

    @keyframes slide-top {
        0% {
            transform: translateY(80px);
            opacity: 0;
        }
        100% {
             transform: translateY(0);
             opacity: 1;
        }
    }
`

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 1px;
    > h1 {
        font-family: "빵구니맘";
        font-weight: bold;
        font-size: 24px;
    }
    > p {
        font-size: 15px;
        transform: translateY(5%);
    }
`

const Description = styled.p`
    font-size: 15px;
`