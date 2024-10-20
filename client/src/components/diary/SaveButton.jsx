import React from 'react';
import styled from 'styled-components';
import { RiSaveFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const SaveButton = ({ handleSave, isSaved, handleEdit, handleConfirmEdit, isEditing }) => {
  return isEditing ? (
    <SaveButtonContainer onClick={handleConfirmEdit}><FaCheck /></SaveButtonContainer>
  ) : isSaved ? (
    <SaveButtonContainer onClick={handleEdit}><FaEdit /></SaveButtonContainer>
  ) : (
    <SaveButtonContainer onClick={handleSave}><RiSaveFill /></SaveButtonContainer>
  );
};

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
  //임시색깔
`;