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
        const query = "INSERT INTO AuthToken (user_id, refresh_token) VALUES(?, ?);"
        await db.connection(query, [user_id, refreshToken]);
    }
};

module.exports = authStorage;