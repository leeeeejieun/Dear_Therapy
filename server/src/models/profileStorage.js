const db = require("../config/db");

class ProfileStorage {
    static async findProfileImage(user_id) {
        const query = "SELECT profile_image FROM User WHERE user_id =?;";
        const response = await db.connection(query, [user_id]);
        return response;
    };   

    static async updateProfileImage(user_id, imageUrl) {
        const query = "UPDATE User SET profile_image = ? WHERE user_id =?;";
        await db.connection(query, [imageUrl, user_id]);
    }
    
    static async getProfile(user_id) {
        const query = "SELECT user_name, profile_image FROM User WHERE user_id = ?;";  
        const response = await db.connection(query, [user_id]);
        return response;
    }
};

module.exports = ProfileStorage;
