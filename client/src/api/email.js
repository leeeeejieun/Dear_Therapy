import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const checkEmailDuplication = async (email) => {
    const response = await axios.get(`${SERVER_URL}/users/email/${email}`);
    return response.data;
};
