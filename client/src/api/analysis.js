import api from "api/token";

export const postAnalysis = async (userData) => {
    const  {user_id, date} = userData;
    const response = await api.post(`/analysis/${user_id}/${date}`, null, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                     },
    });
    return response;
}

export const getAnalysis = async (userData) => {
    const  {user_id, date} = userData;

    const response = await api.get(`/analysis/${user_id}/${date}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                     },
    });
    return response;
}