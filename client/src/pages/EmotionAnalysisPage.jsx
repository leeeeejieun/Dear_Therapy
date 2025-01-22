import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const EmotionAnalysisPage = () => {
  const location = useLocation();
  const { user_id, date, analysisResult } = location.state || {};

  return (
    <PageContainer>
      <Title>테피의 추천</Title>
    </PageContainer>
  );
}

export default EmotionAnalysisPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  background-color: #FFFF;
  outline: 2px dashed #ccc;
  border-radius: 10px;
  margin: 20px 20px;
`;

const Title = styled.h3`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  font-weight: bold;
  font-family: '빵구니맘';
  font-size: 24px;
`;