import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCamera } from "react-icons/fa";

const ImageUploader = ({ image, handleImageUpload, isEditing, handleCancelImage, isSaved }) => {
  const [img, setImg] = useState(image);

  useEffect(() => {
    if (!(image instanceof File)) {
        setImg(image);  
    }
  }, [image]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        handleImageUpload(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
    }
  };

  return (
    <ImageUploaderContainer>
      <label htmlFor="img" >
        {img ? (
          <ImagePreviewContainer>
            <ImagePreview src={img} alt="Uploaded Preview" />
          </ImagePreviewContainer>
        ) : (
            <UploadButton><FaCamera /> 사진 추가하기</UploadButton>
        )}
      </label>
      <UploadInput
        id="img"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={isSaved && !isEditing}
      />
    </ImageUploaderContainer>
  );
}
export default ImageUploader;

const ImageUploaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: auto;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  color: #888;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.div`
  padding: 20px;
  color: #888;
  cursor: pointer;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 10px;
`;

const CancelButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #8E1C1C;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

