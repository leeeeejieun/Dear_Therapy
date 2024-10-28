const {GetObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = require('../config/s3');
const bucket =  process.env.BUCKET;

module.exports = {
    getImage: async(imagePath) => {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: imagePath
        });

        /** 
         *  Signed URL 생성
         *  Signed URL : S3 버킷에 있는 특정 이미지 파일에 대한 임시 접근 권한을 부여하는 URL
         * */
        const url = await getSignedUrl(s3, command, {expiresIn: 24*60*60})  // 유효 시간을 24시간으로 설정
        return url;
    }
};