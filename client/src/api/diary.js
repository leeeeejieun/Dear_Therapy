import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const postDiary = async (formData) => {
        const response = await axios.post(`${SERVER_URL}/diary`, formData,{
                headers: { 'Content-Type': 'multipart/form-data' ,
                           'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
};

export const putEdit = async (diaryData, userData) => {
        const {user_id, date} = userData;
        const response = await axios.put(`${SERVER_URL}/diary/${user_id}/${date}`, diaryData, {
                headers: { 'Content-Type': 'multipart/form-data',
                           'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
};

export const getView = async (userData) => {
        const {user_id, date} = userData;
        const response = await axios.get(`${SERVER_URL}/diary/${user_id}/${date}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
};

export const deleteDiary = async (userData) => {
        const {user_id, date} = userData;
        const response = await axios.delete(`${SERVER_URL}/diary/${user_id}/${date}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
};
        
        

