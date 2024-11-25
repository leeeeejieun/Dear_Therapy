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

export const putEdit = async (formData) => {
        const response = await axios.put(`${SERVER_URL}/diary`, formData, {
                headers: { 'Content-Type': 'multipart/form-data',
                           'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
};

