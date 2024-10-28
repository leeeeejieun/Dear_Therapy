import React from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";

const EmotionAnalysisButton = () => {
  return <EmotionButton><FaSearch /> 테피에게 감정분석 맡기기</EmotionButton>;
};

export default EmotionAnalysisButton;

const EmotionButton = styled.button`
  position: absolute;
  left: 40px;
  top: 517px;
  width: 50%;
  padding: 10px;
  background-color: #8E1C1C;
  color: white;
  font-size: 16px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-family: '학교안심 그림일기';
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;