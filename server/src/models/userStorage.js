const db = require("../config/db");

class UserStorage {
    // 아이디 중복 체크
    static async checkId(user_id) {
        const query =  "SELECT user_id FROM User WHERE user_id = ?;"
        const result = await db.connection(query, [user_id]);
        return result;
    }
};

module.exports = UserStorage;