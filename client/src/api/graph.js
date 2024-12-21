import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getScore = async (userData) => {
    const {user_id, date} = userData;
    const response = await axios.get(`${SERVER_URL}/analysis/score/${user_id}/${date}`,{
        headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
    });
    return response;
}