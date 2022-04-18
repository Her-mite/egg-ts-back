import Minio = require('minio');

const minioClient = new Minio.Client({
  accessKey: 'hujq',
  secretKey: '',
  bucket: 'software',
  endPoint: '',
  timeout: '60s',
  port: 9000,
  useSSL: false,
});

export default minioClient;
