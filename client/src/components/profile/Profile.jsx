import { useState, useEffect, useContext} from "react";
import { getProfile } from "api/profile";
import UserContext from "contexts/UserContext";
import ProfileOptions from "./ProfileOptions";
import styled from "styled-components";

const Profile = () => {
    const [profileImage, setProfileImage] = useState("");
    const [nickname, setNickName] = useState("");
    const {user} = useContext(UserContext);

    useEffect(() => {
        handleProfile();
    }, []);

    const handleProfile = async () => {
        try {
            const response = await getProfile(user);
            const {image, name} = response.data.success;
            setProfileImage(image);
            setNickName(name);
        } catch (err) {
            console.log(err.response);
        }
    };
    

    return(
        <ProfileContainer>
            <Header>
                <ImageContainer>
                    <Image $isDefault={!profileImage}>
                        <img src = {profileImage || "https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/%EA%B8%B0%EB%B3%B8+%ED%94%84%EB%A1%9C%ED%95%84.png"} alt="profile"/>
                    </Image>
                </ImageContainer>
                <NickName>{nickname}</NickName>
            </Header>
            <ProfileOptions profileImage={profileImage} setProfileImage={setProfileImage}/>
        </ProfileContainer>

    );
};

export default Profile;

const ProfileContainer = styled.div`
    width: 300px;
    height: 100%;
    margin: 0 auto;
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 2rem;
    height: 160px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.58);
`;

const ImageContainer = styled.div`
    flex: 1 1 0;
    margin-left: 20px;
`;

const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #D9D9D9;

    > img {
    width: ${({ $isDefault }) => ($isDefault ? "80%" : "100%")};
    height: ${({ $isDefault }) => ($isDefault ? "auto" : "100%")};
    border-radius: ${({ $isDefault }) => ($isDefault ? "none" : "50%")}; 
    object-fit: cover;
}
`

const NickName = styled.p`
    flex: 1 1 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.1px;
    text-align: center; 
    margin-right: 20px;
`;
