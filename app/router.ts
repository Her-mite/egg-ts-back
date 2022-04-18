import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/info/getWebsiteInfo', controller.info.getWebsiteInfo);
  router.post('/api/info/insertWebsiteInfo', controller.info.insertWebsiteInfo);
  router.post('/api/info/deleteDBSingleRow', controller.info.deleteDBSingleRow);

  router.get('/api/minio/getObjectList', controller.minio.getObjectList);
  router.get('/api/minio/getBucketName', controller.minio.getBucketName);
  router.post('/api/minio/downloadObject', controller.minio.downloadObject);
  router.post('/api/minio/uploadObject', controller.minio.uploadObject);
  router.post('/api/minio/removeObject', controller.minio.removeObject);

};
