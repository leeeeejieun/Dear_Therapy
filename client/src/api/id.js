import api from "api/token";

export const checkIdDuplication = async (user_id) => {
    try {
        const response = await api.get(`/users/id/${user_id}`);
        return response.status;
    } catch (error) {
        throw error
    }
};
