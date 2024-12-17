const Analysis = require("../models/analysisModel");
const responseUtils = require("../utils/responseUtils");

const analysisCtrl = {
    // 감정 분석 요청
    analysis: async (req, res) => {
        try {
            const anal = new Analysis(req.params);
            const response = await anal.analysis();
            responseUtils.createResponse(res, response);
        }catch(err) {
            responseUtils.createResponse(res, {code: 500});
        }
    },
    // 코멘트 및 맞춤형 추천 정보 제공
    recommend: async (req, res) => {
        try {
            const anal = new Analysis(req.params);
            const response = await anal.recommend();
            responseUtils.createResponse(res, response);
        } catch(err) {
            responseUtils.createResponse(res, {code: 500});
        }
    },
};

module.exports = analysisCtrl;