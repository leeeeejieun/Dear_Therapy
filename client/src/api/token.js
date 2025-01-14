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
        if(error.response?.status === 401) {
            try {
                window.location.href = "/";
            } catch(err) {
                return Promise.reject(err);
            }
        };
        return Promise.reject(error);
    }
);

export default api;