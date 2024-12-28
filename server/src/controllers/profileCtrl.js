const Profile = require("../models/profileModel");
const responseUtils = require("../utils/responseUtils");

module.exports = {
    updateProfile: async (req, res) => {
        try {
            const profile = new Profile({user_id: req.params.user_id, image: req.file});
            const response = await profile.updateProfile();
            responseUtils.createResponse(res, response);
        } catch(err){
            responseUtils.createResponse(res, {code: 500});
        }
    },
    getProfile: async (req, res) => {
        try {
            const profile = new Profile({user_id: req.params.user_id});
            const response = await profile.getProfile();
            responseUtils.createResponse(res, response);
        } catch(err){
            responseUtils.createResponse(res, {code: 500});
        }
    }
};