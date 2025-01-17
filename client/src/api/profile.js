import api from "api/token";

export const getProfile = async (user_id) => {
    const response = await api.get(`/profile/${user_id}`);
    return response;
};

export const logout = async () => {
    const response = await api.delete("/logout");
    return response;
}

export const userDelete = async (user_id) => {
    const response = await api.delete(`/users/${user_id}`);
    return response;
}

export const putProfileImage = async (user_id, image) => {
    const response = await api.put(`/profile/${user_id}`, image, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
};