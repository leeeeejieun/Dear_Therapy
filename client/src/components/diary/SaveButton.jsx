import React from 'react';
import styled from 'styled-components';
import { RiSaveFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const SaveButton = ({ handleSave, isSaved, handleEdit, handleConfirmEdit, isEditing }) => {
  return isEditing ? (
    <SaveButtonContainer onClick={handleConfirmEdit}><FaCheck /> 완료</SaveButtonContainer>
  ) : isSaved ? (
    <SaveButtonContainer onClick={handleEdit}><FaEdit /> 수정</SaveButtonContainer>
  ) : (
    <SaveButtonContainer onClick={handleSave}><RiSaveFill /> 저장</SaveButtonContainer>
  );
};

export default SaveButton;

const SaveButtonContainer = styled.button`
  position: absolute;
  top: 517px;
  right: 40px;
  width: 20%;
  padding: 10px; 
  background-color: #8E1C1C;
  color: white;
  font-size: 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  font-family: '학교안심 그림일기';
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;