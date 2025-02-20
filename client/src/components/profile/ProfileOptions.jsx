import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImageUpload from "./ProfileImageUpload";
import Modal from "components/common/Modal";
import useModal from "hooks/useModal";
import { logout, userDelete, putProfileImage } from "api/profile";
import UserContext from "contexts/UserContext";
import styled from "styled-components";

const ProfileOptions = ({profileImage, setProfileImage}) => {
    const [status, setStatus]  = useState("");
    const { modal, openModal, closeModal } = useModal();
    const { user } = useContext(UserContext);
    const updateProfileImage = useRef("");
    const navigate = useNavigate();
    
    const handleClick = (option) => {
        setStatus(option);
        openModal();
    };

    const handleLogOut = async () => {
        try {
            const response = await logout();
            if(response.status === 200){
                localStorage.removeItem("accessToken");
            }
        } catch(err) {
            console.log(err.response.data.error);
        }
        navigate("/");
    };

    const handleDelete = async () => {
        try {
            const response = await userDelete(user);
            if(response.status === 200) {
                localStorage.removeItem("accessToken");
            }
        } catch(err) {
            console.log(err.response.data.error);
        }
        navigate("/");
    };

    const handleProfileImage = async () => {
        try {  
            const { file, url, isUpdate } = updateProfileImage.current;
            
            // 프로필 이미지가 변경되지 않은 경우
            if(!isUpdate) return;

            const image = new FormData();
            image.append("image", file);
            
            const response = await putProfileImage(user, image);
            if(response.status === 200) {
               setProfileImage(url);
            }
        } catch(err) {
            console.log(err.response.data.error);
        }
    }

    const handleImageUpload = (image) => {
        updateProfileImage.current = image;
    }

    return(
        <>  
            <OptionContainer>
                <OptionButton onClick={() => handleClick("change")}>프로필 이미지 변경</OptionButton>
                {modal && status === "change" &&
                    <Modal 
                        modalType="profile"
                        closeModal={closeModal}
                        onConfirm = {handleProfileImage}
                        onDefaultImage={setProfileImage}
                    >
                        <ProfileImageUpload profileImage={profileImage} handleImageUpload={handleImageUpload}/>
                    </Modal>
                }

                <OptionButton onClick={() => handleClick("logout")}>로그아웃</OptionButton>
                {modal && status === "logout" && 
                    <Modal 
                        content={"정말 로그아웃을 하시겠습니까?"} 
                        closeModal={closeModal} 
                        onConfirm={handleLogOut}/>
                }

                <OptionButton onClick={() => handleClick("delete")}>회원탈퇴</OptionButton>
                {modal && status === "delete" &&
                     <Modal 
                        content={"정말 회원탈퇴를 하시겠습니까?"} 
                        subContent={"탈퇴 후엔 그동안의 기록을 복구할 수 없습니다."}
                        closeModal={closeModal} 
                        onConfirm={handleDelete}/>
                }
            </OptionContainer>
        </>
    );
};

export default ProfileOptions;

const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    top: 4.5rem;
`;

const OptionButton = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 20px;
    border: 2px solid #d3c5c5;
    background-color: rgba(255, 255, 255, 0.58);
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
`;