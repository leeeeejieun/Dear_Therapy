// SaveButton.js
import React from 'react';
import styled from 'styled-components';

function SaveButton({ handleSave, isSaved, handleEdit }) {
  return isSaved ? (
    <SaveButtonContainer onClick={handleEdit}>수정</SaveButtonContainer>
  ) : (
    <SaveButtonContainer onClick={handleSave}>저장</SaveButtonContainer>
  );
}

export default SaveButton;

const SaveButtonContainer = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;
