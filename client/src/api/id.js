import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const checkIdDuplication = async (user_id) => {
    const response = await axios.get(`${SERVER_URL}/users/id/${user_id}`);
    return response.data;
};
