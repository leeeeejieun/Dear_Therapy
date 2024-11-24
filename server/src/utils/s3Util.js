require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secreatAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-northeast-2'
});

exports.uploadFile = (file, filePath) => {
  const params = {
    Busket: AWS_BUCKET_NAME,
    key: filePath,
    Body: file.buffer,
    contentType: file.mimetype
  };
  return s3.upload(params).promise();
};