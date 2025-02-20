import { useLocation  } from 'react-router-dom';
import BottomNavigation from 'components/common/BottomNavigation';
import AnalysisResult from 'components/analysis/AnalysisResult';
import styled from 'styled-components';

const EmotionAnalysisPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const date = params.get("date");

  return (
    <AnalysisContainer>
      <Title>테피의 추천</Title>
      <AnalysisResult date={date}/>
      <BottomNavigation />
    </AnalysisContainer>
  );
}

export default EmotionAnalysisPage;

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const Title = styled.h3`
  position: relative;
  top: 25px;
  text-align: center;
  font-weight: bold;
  font-family: "빵구니맘";
  font-size: 33px;
`;