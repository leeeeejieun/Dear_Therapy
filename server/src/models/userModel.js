const UserStorage = require("../models/userStorage");
const userUtils = require("../utils/userUtils");

class User {

    constructor(body) {
        this.body = body;
    }

    // 아이디 중복 체크
    async checkId() {
        const user_id = this.body;
        if(!userUtils.isValidId(user_id)) {
            return {code: 400, message: "잘못된 아이디 형식입니다."}
        }

        const result = await UserStorage.checkId(user_id);
        if(result) {
            return {code: 409, message: "이미 존재하는 아이디입니다."}
        } 

        return {code: 200}
    }

    // 이메일 중복 체크
    async checkEmail() {
        const email = this.body;
        if(!userUtils.isValidEmail(email)){
            return {code: 400, message: "잘못된 이메일 형식입니다."}
        }

        const result = await UserStorage.checkEmail(email);
        if(result) {
            return {code: 409, message: "이미 존재하는 이메일입니다."}
        }

        return {code: 200}
    }
}

module.exports = User;