const authStorage = require("./authStorage");
const jwtUtils = require("../utils/jwtUtils");

class Auth {

    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        const findUser = await authStorage.findUser({user_id: client.user_id});  // 사용자 조회

        // 아이디가 존재하는 경우
        if(findUser) {
            const {user_id, password} = findUser;             
            if(client.user_id === user_id && client.password === password) {  // 입력한 아이디와 비밀번호가 모두 일치한 경우
                const accessToken = jwtUtils.sign({user_id: user_id}); 
                const refreshToken = jwtUtils.sign({}, {expiresIn: "14d"});
                
                await authStorage.insertRefresh(user_id, refreshToken);
                return { code: 200, data: {accessToken : accessToken }, refreshToken};
            }
        }
        // 아이디가 존재하지 않거나, 아이디 또는 비밀번호가 일치하지 않은 경우
        return { code: 401, message: "아이디 또는 비밀번호가 잘못되었습니다." }
    }
};

module.exports = Auth;

