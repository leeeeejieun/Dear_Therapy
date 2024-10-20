import React from 'react';
import styled from 'styled-components';

const EmotionAnalysisButton = () => {
  return <EmotionButton>테피에게 감정분석 맡기기</EmotionButton>;
};

export default EmotionAnalysisButton;

const EmotionButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;//임시로 만든 버튼 UI