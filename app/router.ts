import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 网站信息
  router.get('/api/info/getWebsiteInfo', controller.info.getWebsiteInfo);
  router.post('/api/info/insertWebsiteInfo', controller.info.insertWebsiteInfo);
  router.post('/api/info/deleteDBSingleRow', controller.info.deleteDBSingleRow);

  // 对象存储
  router.get('/api/minio/getObjectList', controller.minio.getObjectList);
  router.get('/api/minio/getBucketName', controller.minio.getBucketName);
  router.post('/api/minio/downloadObject', controller.minio.downloadObject);
  router.post('/api/minio/uploadObject', controller.minio.uploadObject);
  router.post('/api/minio/removeObject', controller.minio.removeObject);

  // 文件信息
  router.get('/api/file/getCurrentFiles', controller.file.getCurrentFiles);
  router.get('/api/file/getFileContent', controller.file.getFileContent);

};
