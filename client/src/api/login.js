import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const postLogin = async (userData) => {
        const response = await axios.post(`${SERVER_URL}/login`, userData);
        return response;
};
