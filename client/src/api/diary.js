import api from "api/token";

export const postDiary = async (formData) => {
        const response = await api.post("/diary", formData,{
                headers: { 'Content-Type': 'multipart/form-data' }            
        });
        return response;
};

export const putEdit = async (diaryData, userData) => {
        const {user_id, date} = userData;
        const response = await api.put(`/diary/${user_id}/${date}`, diaryData, {
                headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response;
};

export const getView = async (userData) => {
        const {user_id, date} = userData;
        const response = await api.get(`/diary/${user_id}/${date}`);
        return response;
};

export const deleteDiary = async (userData) => {
        const {user_id, date} = userData;
        const response = await api.delete(`/diary/${user_id}/${date}`);
        return response;
};

export const postAnalysis = async (userData) => {
        const  {user_id, date} = userData;
        const response = await axios.post(`${SERVER_URL}/analysis/${user_id}/${date}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                         },
        });
        return response;
}
        
        

