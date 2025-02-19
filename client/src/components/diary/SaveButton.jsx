import React from 'react';
import Button from "components/common/Button";
import styled from 'styled-components';
import { RiSaveFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SaveButton = ({ handleSave, isSaved, handleEdit, handleConfirmEdit, isEditing, isMenu, openModal, handleEmotionAnalysis }) => {
 
  return isEditing ? (
    <Button
      buttonType="save"
      icon={<FaCheck />}
      text="완료"
      onClick={handleConfirmEdit}
    />
  ): isMenu ? (
      <ButtonContainer>
          <Button
            buttonType="change"
            icon={<MdDelete />}
            text="삭제"
            onClick={openModal}
          />
         <Button
          buttonType="change"
          icon={<FaEdit />}
          text="수정"
          onClick={handleEdit}
        /> 
      </ButtonContainer>
  ) : isSaved ? (
      <Button 
        buttonType="analysis"
        icon={<FaSearch />}
        text="테피에게 감정분석 요청"
        onClick={handleEmotionAnalysis}
        />
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