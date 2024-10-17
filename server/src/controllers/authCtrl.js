const Auth = require("../models/authModel");
const responseUtils = require("../utils/responseUtils"); 

const authCtrl = {
        login: async (req, res) => {
           try {
                const auth = new Auth(req.body);
                const response = await auth.login();
                responseUtils.createResponse(res, response);
           } catch(err) {
                responseUtils.createResponse(res, 500);
           };
        },
};

module.exports = authCtrl;