const Auth = require("../models/authModel");
const responseUtils = require("../utils/responseUtils"); 

const authCtrl = {
     login: async (req, res) => {
          try {
               const auth = new Auth(req.body);
               const response = await auth.login();
               
               if(response.code === 200) {
                    // RefreshToken을 쿠키로 넘김
                    res.cookie("refreshToken", response.refreshToken, {
                         httpOnly: true,
                         secure: true,
                         maxAge: 60 * 60 * 24 * 14,   // 쿠키의 유효 기간을 14일로 설정
                    });
                    console.log(response.refreshToken)
               }
               responseUtils.createResponse(res, response);
          }catch(err) {
               responseUtils.createResponse(res, {code: 500});
          };
     },
     refresh: async (req, res) => {
          // 헤더에서 refreshToken 추출
          const refreshToken = req.cookies.refreshToken;  
          try {
               const auth = new Auth(refreshToken);
               const response = await auth.refresh();
               responseUtils.createResponse(res, response);
          }catch(err) {
               responseUtils.createResponse(res, {code: 500});
          };
     },
     logout: async (req, res) => {  
          const user_id = req.user.user_id;  // JWT 미들웨어로부터 받은 인증된 사용자 아이디
          const refreshToken = req.cookies.refreshToken;  
          try {
               const auth = new Auth({user_id, refreshToken});
               const response =  await auth.logout();
               responseUtils.createResponse(res, response);
          }catch(err) {
               responseUtils.createResponse(res, {code: 500});
          }
     },
};

module.exports = authCtrl;