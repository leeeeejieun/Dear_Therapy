import React from 'react';
import Button from "components/common/Button";
import styled from 'styled-components';
import { RiSaveFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const SaveButton = ({ handleSave, isSaved, handleEdit, handleConfirmEdit, isEditing }) => {
  return isEditing ? (
    <Button
      buttonType="save"
      icon={<FaCheck />}
      text="완료"
      onClick={handleConfirmEdit}
    />
    
  ) : isSaved ? (
    <ButtonContainer>
      <Button 
        buttonType="analysis"
        icon={<FaSearch />}
        text="테피에게 감정분석 요청"
        />
      <Button
        buttonType="change"
        icon={<FaEdit />}
        text="수정"
        onClick={handleEdit}
      /> 
    </ButtonContainer>
  ) : (
    <Button
      buttonType="save"
      icon={<RiSaveFill />}
      text="저장"
      onClick={handleSave}
    />
    
  );
};

export default SaveButton;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`