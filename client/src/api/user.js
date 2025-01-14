import api from "api/token";

export const registerUser = async (userData) => {
    const response = await api.post("/users", userData);
    return response;
};