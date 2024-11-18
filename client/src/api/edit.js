import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const putEdit = async (userData) => {
        const response = await axios.put(`${SERVER_URL}/diary`, userData);
        return response;
};