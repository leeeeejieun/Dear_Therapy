import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const postLogin = async (userData) => {
        const response = await axios.post(`${SERVER_URL}/login`, userData);
        return response;
};

export const kakaoLogin = async (code) => {
        const response = await axios.post(`${SERVER_URL}/login/kakao/${code}`);
        return response;
}
