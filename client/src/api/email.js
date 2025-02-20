import api from "api/token";

export const checkEmailDuplication = async (email) => {
    try {
        const response = await api.get(`/users/email/${email}`);
        return response.status;
    } catch (error) {
        throw error;
    }
};
