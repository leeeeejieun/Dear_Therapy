import AnalysisResult from 'components/analysis/AnalysisResult';
import styled from 'styled-components';

const Analysis = ({date}) => {

  return (
    <AnalysisContainer>
      <Title>테피의 추천</Title>
      <AnalysisResult date={date}/>
    </AnalysisContainer>
  );
}

export default Analysis;

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  position: relative;
  top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  text-align: center;
  font-weight: bold;
  font-family: "빵구니맘";
  font-size: 33px;
`;