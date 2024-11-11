import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const postDiary = async (userData) => {
        const response = await axios.post(`${SERVER_URL}/diary`, userData);
        return response;
};