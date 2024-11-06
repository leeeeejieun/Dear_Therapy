const bcrypt = require("bcrypt");

module.exports = {
    isValidId : (user_id) => {
        // 아이디는 영문 소문자 및 숫자로 이루어진 3자 이상 15자 이하의 문자열만 가능
        const regex = /^[a-z0-9]{3,15}$/;
        if(!user_id || !regex.test(user_id)){
            return false;
        }
        return true;
    },
    isValidEmail : (email) => {
         // 네이버 메일만 가능
        if(!email || !email.endsWith("@naver.com")){
            return false;
        }
        return true;
    },
    hashedPassword : async (password) => {
        const saltRounds = 10;   // salt 복잡도 설정
        const salt = await bcrypt.genSalt(saltRounds);  // salt 생성(난수 데이터)
        return await bcrypt.hash(password, salt);  // 비밀번호와 salt를 결합하여 해싱된 비밀번호 생성
    }, 
    // 평문 비밀번호와 해싱된 비밀번호가 일치한지 확인
    checkPassword : async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },
}