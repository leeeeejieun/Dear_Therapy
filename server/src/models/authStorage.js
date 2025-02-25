const db = require("../config/db");

class authStorage {
    // 매개변수에 따른 사용자 정보 반환
    static async findUser(userInfo) {
        const key = Object.keys(userInfo)[0];
        const value = Object.values(userInfo)[0];

        const query = `SELECT * FROM User WHERE ${key} = ?;`
        const result = await db.connection(query, [value]);
        return result;
    }
    
    // 로그인 시 해당 사용자의 refreshToken을 DB에 저장
    static async insertRefresh(user_id, refreshToken) {
        const query = `INSERT INTO AuthToken (user_id, refresh_token) VALUES(?, ?) 
                       ON DUPLICATE KEY UPDATE refresh_token = ?;`
        await db.connection(query, [user_id, refreshToken, refreshToken]);
    }

    // 로그아웃 시 해당 사용자의 refreshToken을 삭제
    static async deleteRefresh(user_id, refreshToken) {
        
        const query = "DELETE FROM AuthToken WHERE user_id = ? AND refresh_token = ?;";
        await db.connection(query, [user_id, refreshToken]);
    }

    // 사용자의 refreshToken 존재 유무 확인
    static async findRefresh(user_id) {
        const query = "SELECT * FROM AuthToken WHERE user_id = ?;";
        const result = await db.connection(query, [user_id]);
        return result;
    }

    static async insertKakaoUser(userData) {
        const {user_id, user_name, image} = userData;
        const query = "INSERT INTO User (user_id, user_name, profile_image) VALUES(?, ?, ?);"
        await db.connection(query, [user_id, user_name, image]);
    }
};

module.exports = authStorage;