import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const registerUser = async (userData) => {
    const response = await axios.post(`${SERVER_URL}/users`, userData);
    return response;
};