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
}