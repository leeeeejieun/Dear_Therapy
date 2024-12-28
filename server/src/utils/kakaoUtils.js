const axios = require("axios");

module.exports = {
    // 전달 받은 인가 코드를 이용해서 카카오 서버로부터 토큰 발급 받기
    getAccessToken: async (code) => {
        try {
            const response = await axios.post("https://kauth.kakao.com/oauth/token", null, {
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
                },
                params: {
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_ID,
                    redirect_uri: process.env.KAKAO_REDIRECT_URI,
                    code: code
                }
            });
            token = response.data.access_token;
            return token;
        } catch(err) {
            console.log(err);
        };
    },
    // accessToken을 이용하여 카카오 서버로부터 사용자 정보 받기
    getUserInfo: async (token) => {
         try {
            const user = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return user.data;
        }catch(err) {
            console.log(err);
        }
    }
};