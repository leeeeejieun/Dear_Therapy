const User = require("../models/userModel");
const responseUtils = require("../utils/responseUtils");

const userCtrl = {
    checkId: async (req, res) => {
        try {
            const user = new User(req.params.user_id);
            const response = await user.checkId();
            responseUtils.createResponse(res, response);
        }catch(err) {
            responseUtils.createResponse(res, {code: 500});
        };
    },
    checkEmail: async (req, res) => {
        try{
            const user = new User(req.params.email);
            const response = await user.checkEmail();
            responseUtils.createResponse(res, response);
        }catch(err) {
            responseUtils.createResponse(res, {code: 500});
        };
    },
    signUp: async (req, res) => {
        try{
            const user = new User(req.body);
            const response = await user.signUp();
            responseUtils.createResponse(res, response);
        }catch(err) {
            responseUtils.createResponse(res, {code: 500});
        };
    },
    withdraw: async (req, res)  => {
        try {
            const user = new User(req.params.user_id);
            const response = await user.withdraw();
            responseUtils.createResponse(res, response);
        }catch(err) {
            responseUtils.createResponse(res, {code: 500});
        }
    }
}

module.exports = userCtrl;