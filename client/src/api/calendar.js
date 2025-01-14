import api from "api/token";

export const getMonthEmoji = async (userData) => {
    const {user_id, date} = userData;
    const response = await api.get(`/analysis/month/${user_id}/${date}`);
    return response;
}