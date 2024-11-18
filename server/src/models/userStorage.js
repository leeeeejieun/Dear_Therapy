const db = require("../config/db");

class UserStorage {
  
    static async checkId(user_id) {
        const query =  "SELECT user_id FROM User WHERE user_id = ?;"
        const result = await db.connection(query, [user_id]);
        return result;
    }

    static async checkEmail(email) {
        const query =  "SELECT email FROM User WHERE email = ?;"
        const result = await db.connection(query, [email]);
        return result;
    };

    static async insertUser (userInfo) {
        const {user_id, name, email, password } = userInfo;
        const query = "INSERT INTO User(user_id, user_name, email, password) VALUES(?, ?, ?, ?);"
        await db.connection(query, [user_id, name, email, password]);
    }
};

module.exports = UserStorage;