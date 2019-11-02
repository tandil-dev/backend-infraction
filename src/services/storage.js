import AWS from 'aws-sdk';
import Config from '../config';

const s3 = new AWS.S3({
  endpoint: Config.aws.useLocal ? new AWS.Endpoint('http://localhost:4572') : undefined,
});

const uploadToS3 = async (createReadStream, name, type, ext) => {
  const params = {
    ACL: 'public-read',
    Bucket: Config.aws.buckets[type.toLowerCase()],
    Key: `${name}.${ext}`,
    Body: createReadStream(),
    ContentType: (ext === 'json') ? 'application/json' : undefined,
  };
  return s3.upload(params).promise();
};

const uploadBodyToS3 = async (body, name, type, ext) => {
  const params = {
    ACL: 'public-read',
    Bucket: Config.aws.buckets[type.toLowerCase()],
    Key: `${name}.${ext}`,
    Body: body,
    ContentType: (ext === 'json') ? 'application/json' : undefined,
  };
  return s3.upload(params).promise();
};

const deleteFromS3 = async (elementUrl, type) => {
  const Key = elementUrl.split('/').pop();
  const params = {
    Bucket: Config.aws.buckets[type.toLowerCase()],
    Key,
  };
  return s3.deleteObject(params).promise();
};

export {
  // eslint-disable-next-line import/prefer-default-export
  uploadToS3,
  uploadBodyToS3,
  deleteFromS3,
};
