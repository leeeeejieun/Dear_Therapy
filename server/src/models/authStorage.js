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
};

module.exports = authStorage;