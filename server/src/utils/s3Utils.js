const {PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');


const s3 = require('../config/s3');
const bucket =  process.env.BUCKET;

module.exports = {
    // multer를 이용하여 form-data 형식의 이미지 받기
    upload : multer({ storage: multer.memoryStorage() }),  // 메모리에 이미지 파일 임시 저장

    // s3에 사용자 이미지 저장
    uploadImage: async (baseFolder, image, user_id, date) => {
        const fileName = Buffer.from(image.originalname, "latin1").toString("utf8"); // 한글 깨짐 방지
        const path = `${baseFolder}/${user_id}/${fileName}_${date}`; // 날짜와 파일명을 포함한 경로
        
        const command =  new PutObjectCommand({
            Bucket: bucket,
            Key: path,   // 저장 위치 및 파일명 설정
            Body: image.buffer
       });
    
        await s3.send(command);
        return path;
  },

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
   
  },
};