import React from 'react';
import Button from "components/common/Button";
import { RiSaveFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const SaveButton = ({ handleSave, isSaved, handleEdit, handleConfirmEdit, isEditing }) => {
  return isEditing ? (
    <Button
      buttonType="save"
      icon={<FaCheck />}
      text="완료"
      onClick={handleConfirmEdit}
    />
    
  ) : isSaved ? (
    <Button
      buttonType="save"
      icon={<FaEdit />}
      text="수정"
      onClick={handleEdit}
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

