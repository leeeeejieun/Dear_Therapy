import React from 'react';
import Button from "components/common/Button";
import { MdDelete } from "react-icons/md";
import styled from 'styled-components';

const DeleteButton = ({ handleDelete }) => {
    return (
      <Button
        buttonType="delete"
        icon={<MdDelete />}
        text="삭제"
        onclick={handleDelete}
      />
    );
    

};

export default DeleteButton;