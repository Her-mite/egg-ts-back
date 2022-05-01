import Minio = require('minio');
import { minioConfig } from '../../config/config.sensitive';

const minioClient = new Minio.Client(minioConfig);

export default minioClient;
