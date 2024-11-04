const db = require("../config/db");

class UserStorage {
  
    static async checkId(user_id) {
        const query =  "SELECT user_id FROM User WHERE user_id = ?;"
        const result = await db.connection(query, [user_id]);
        return result;
    }

    static async checkEmail(email) {
        console.log(email)
        const query =  "SELECT email FROM User WHERE email = ?;"
        const result = await db.connection(query, [email]);
        return result;
    }
};

module.exports = UserStorage;