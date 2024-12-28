import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from 'contexts/UserContext';
import { kakaoLogin } from "api/login";

const Kakao = () => {
    const navigate = useNavigate();
    const redirectCode = new URL(window.location.href).searchParams.get("code");
    const { setUser } = useContext(UserContext);

    const login = async () => {
        try {
            const response = await kakaoLogin(redirectCode);
            const { accessToken, user_id } = response.data.success;
            localStorage.setItem("accessToken", accessToken);
            setUser(user_id);
            navigate("/home"); 
        } catch (err) {
            console.log(err.response.data.error);
        }
    };

    useEffect(() => {
        login(); 
    }, []);

    return (
        <>
          
        
        </>
    );
};

export default Kakao;