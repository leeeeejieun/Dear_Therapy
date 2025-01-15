import { useState, useRef } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const ProfileImageUpload = ({profileImage, handleImageUpload}) => {
    const [image, setImage] = useState(profileImage);
    const fileInput = useRef("");

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
            handleImageUpload({file: file, url: reader.result, isUpdate: true});
          };
          reader.readAsDataURL(file);
        } 
    };

    const handleDelete = () => {
        setImage("");
        handleImageUpload({file: "", url: "", isUpdate: true });
        if(fileInput.current) {
            fileInput.current.value = "";   // 파일 입력값 초기화
        }
      }
    
    return(
        <ImageContainer>
            <label htmlFor="img">
                <Image $isDefault={!image}>
                    <img src = {image || "https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EA%B8%B0%EB%B3%B8+%ED%94%84%EB%A1%9C%ED%95%84.png"} alt="profile"/> 
                </Image>
            </label>
            {image && <Icon onClick={handleDelete}><IoClose /></Icon>}
           <input 
               id="img"
               type="file"
               accept="image/*"
               onChange={handleUpload}
               ref={fileInput}
           />
        </ImageContainer>
    );  
};

export default ProfileImageUpload;

const ImageContainer = styled.div`
   
    position: relative;
    bottom: 15px;
    margin: 0 auto;
    
    > input {
        display: none;
    }
`;

const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #D9D9D9;

    > img {
        width: ${({ $isDefault }) => ($isDefault ? "80%" : "100%")};
        height: ${({ $isDefault }) => ($isDefault ? "auto" : "100%")};
        border-radius: ${({ $isDefault }) => ($isDefault ? "none" : "50%")}; 
        object-fit: cover;
    }
`
const Icon = styled.button`
  position: absolute;
  top: 0px;
  right: -50px;
  font-size: 23px;
  z-index: 10;
  background: none;
`;