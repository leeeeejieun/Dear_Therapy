const jwt = require("../utils/jwtUtils");
const responseUtils = require("../utils/responseUtils")

// JWT 기반 사용자 인증 미들웨어
const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        const response = {code: 401, message: "로그인을 해주세요."};
        return responseUtils.createResponse(res, response);
    }

    // Authorization 헤더에서 토큰 추출
    const token = authHeader.split('Bearer ')[1]; 
    const result = jwt.verify(token);    // accessToken 유효성 검사

    if(result.ok) {
        req.user = result.decoded;
        next();     // 다음 미들웨어로 이동
    } 
    else {
        const response = {code: 401, message: "accessToken이 만료되었습니다."};
        responseUtils.createResponse(res, response);
    }
};

module.exports = authToken;