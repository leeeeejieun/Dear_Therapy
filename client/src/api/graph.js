import api from "api/token";

export const getScore = async (userData) => {
    const {user_id, date} = userData;
    const response = await api.get(`/analysis/score/${user_id}/${date}`);
    return response;
}