const db = require("../config/db");

class UserStorage {
    // 아이디 값이 일치한 사용자 정보를 반환
    static async findUser(user_id) {
        const query = "SELECT * FROM User WHERE user_id = ?;"
        const result = await db.connection(query, [user_id]);
        return result;
    }
};

module.exports = UserStorage;