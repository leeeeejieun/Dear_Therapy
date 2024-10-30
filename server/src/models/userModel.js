const UserStorage = require("../models/userStorage");

class User {

    constructor(body) {
        this.body = body;
    }

    async checkId() {
        const user_id = this.body;

        const regex = /^[a-zA-Z0-9]*$/;   // 아이디는 영문,숫자만 포함 가능

        // 아이디 길이는 3자 이상 10자 미만이어야 함
        if(!regex.test(user_id) || user_id.length < 3 || user_id.length >= 10) {
            return {code: 400, message: "잘못된 아이디 형식입니다."}
        }

        const result = await UserStorage.checkId(user_id);
        // 아이디가 중복인 경우
        if(result) {
            return {code: 409, message: "이미 존재하는 아이디입니다."}
        } 
        // 아이디가 중복이 아닌 경우
        return {code: 200}
    }
}

module.exports = User;