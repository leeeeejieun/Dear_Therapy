import React, { useState } from "react";
import styled from "styled-components";

const ImageUploader = ({ isImageSelected, handleImageUpload, selectedImage }) => {
  return (
    <ImageUploaderContainer>
      {isImageSelected && selectedImage ? (
        <SelectedImage src={selectedImage} alt="Selected" />
      ) : (
        <UploadLabel htmlFor="imageUpload">
          사진 추가하기
          <UploadInput id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
        </UploadLabel>
      )}
    </ImageUploaderContainer>
  );
};

export default ImageUploader;

const ImageUploaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  color: #888;
  width: ${(props) => (props.isImageSelected ? 'auto' : '100%')};
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const SelectedImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
`;


 




