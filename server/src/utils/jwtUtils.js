const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
    // token 생성
    sign: (payload, options = {expiresIn: "30m"}) => {
        return jwt.sign(payload, secretKey, {
            algorithm: "HS256",
            ...options   // token의 유효시간을 설정
        })
    },
    // token 유효성 검사
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secretKey);
            return {
                ok: true,
                decoded  // 검증된 사용자 정보를 반환
            };
        }catch(err) {
            return {
                ok: false,
            };
        }     
    }
};
