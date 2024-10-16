const User = require("../models/userModel");
const responseUtils = require("../utils/responseUtils"); 

const userCtrl = {
        login: async (req, res) => {
           try {
                const user = new User(req.body);
                const response = await user.login();
                responseUtils.createResponse(res, response);
           } catch(err) {
                responseUtils.createResponse(res, 500);
           };
        },
};

module.exports = userCtrl;