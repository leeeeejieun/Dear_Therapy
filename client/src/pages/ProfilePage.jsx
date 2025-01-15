import Profile from "components/profile/Profile";
import BottomNavigation from "components/common/BottomNavigation";
import styled from "styled-components";

const ProfilePage = () => {
    return(
        <ProfileContainer>
            <Profile />
            <BottomNavigation /> 
        </ProfileContainer>
    );
};

export default ProfilePage;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`;