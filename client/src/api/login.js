import api from "api/token";

export const postLogin = async (userData) => {
        const response = await api.post("/login", userData);
        return response;
};

export const kakaoLogin = async (code) => {
        const response = await api.post(`/login/kakao/${code}`);
        return response;
}
