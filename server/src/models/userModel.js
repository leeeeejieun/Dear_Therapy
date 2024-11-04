const UserStorage = require("../models/userStorage");

class User {

    constructor(body) {
        this.body = body;
    }

    // 아이디 중복 체크
    async checkId() {
        const user_id = this.body;

        /**
         * 아이디는 영문 소문자 및 숫자로 이루어진 3자 이상 15자 이하의 문자열만 가능
         */
        const regex = /^[a-z0-9]{3,15}$/;   

        if(!regex.test(user_id)) {
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

        // 네이버 메일만 가능
        if(!email.endsWith("@naver.com")){
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