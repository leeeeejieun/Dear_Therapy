import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
console.log('Server URL:', SERVER_URL);

export const checkEmailDuplication = async (email) => {
    try {
        const response = await axios.get(`${SERVER_URL}/users/email/${email}`);
        console.log(response); //서버응답확
        return response.status;
    } catch (error) {
        throw error
    }
};
