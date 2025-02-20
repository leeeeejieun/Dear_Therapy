import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});


// 요청 인터셉터
api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    response => response,
    async error => {
        if(error.response?.status === 401 && 
            (error.response?.data.error.message === "accessToken이 만료되었습니다." ||
             error.response?.data.error.message === "로그인을 해주세요.")
            ){  
                localStorage.removeItem("accessToken");
                window.location.href = "/";
            };
        return Promise.reject(error);
    }
);

export default api;