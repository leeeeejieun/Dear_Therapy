const authStorage = require("./authStorage");
const jwtUtils = require("../utils/jwtUtils");
const userUtils = require("../utils/userUtils");
const kakaoUtis = require("../utils/kakaoUtils");

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
            const checkPassword = await userUtils.checkPassword(client.password, password);

            if(client.user_id === user_id && checkPassword) {  // 입력한 아이디와 비밀번호가 모두 일치한 경우
                const accessToken = jwtUtils.sign({user_id: user_id}); 
                const refreshToken = jwtUtils.sign({}, {expiresIn: "14d"});   // 유효기간을 2주로 설정
                await authStorage.insertRefresh(user_id, refreshToken);
                return { code: 200, data: {accessToken : accessToken }, refreshToken};
            }
        }
        // 아이디가 존재하지 않거나, 아이디 또는 비밀번호가 일치하지 않은 경우
        return { code: 401, message: "아이디 또는 비밀번호가 잘못되었습니다." }
    };
    
    // accessToken 만료 시 refreshToken을 이용하여 재발급 수행
    async refresh() {
        const refreshToken = this.body;

        if (!refreshToken) {
            return { code: 401, message: "refreshToken이 존재하지 않습니다." };
        }
    
        const findUser = await authStorage.findUser({ refresh_token: refreshToken });
        const result = findUser ? jwtUtils.verify(refreshToken) : false;
       
        // refreshToken이 유효한 경우 accessToken을 재발급
        if (result.ok) {
            const { user_id } = findUser;
            const newAccessToken = jwtUtils.sign({ user_id: user_id });
            return { code: 200, data: {newAccessToken: newAccessToken }};
        }
    
        return { code: 403, message: "refreshToken이 유효하지 않습니다." };
    };

    async logout() {
        const user_id = this.body;
        const result = await authStorage.findRefresh(user_id);
    
        if (!result){
            return { code: 401, message: "이미 로그아웃이 완료된 사용자입니다."};
        }
        await authStorage.deleteRefresh(user_id, result.refresh_token);
        return { code: 200 };
    }

    async kakaoLogin() {
        const code = this.body;
        
        if(!code) {
            return {code: 401, message: "인가코드가 존재하지 않습니다."};
        }

        const token = await kakaoUtis.getAccessToken(code);
        const user = await kakaoUtis.getUserInfo(token);

        const user_id = String(user.id);
        const userData = user.kakao_account.profile;

        const findUser = await authStorage.findUser({user_id: user_id});  // 사용자 조회
        
        if(!findUser) {
           await authStorage.insertKakaoUser({user_id: user_id, user_name: userData.nickname, image: userData.profile_image_url});
        }
        
        const accessToken = jwtUtils.sign({user_id: user_id}); 
        const refreshToken = jwtUtils.sign({}, {expiresIn: "14d"});   // 유효기간을 2주로 설정
        await authStorage.insertRefresh(user_id, refreshToken);
        return { code: 200, data: {accessToken : accessToken, user_id: user_id }, refreshToken};
    };
}

module.exports = Auth;

