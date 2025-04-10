import api from "api/token";

export const getAnalysis = async (userData) => {
    const  {user_id, date} = userData;

    const response = await api.get(`/analysis/${user_id}/${date}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                     },
    });
    return response;
}