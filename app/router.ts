import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/info/getWebsiteInfo', controller.info.getWebsiteInfo);
  router.post('/api/info/insertWebsiteInfo', controller.info.insertWebsiteInfo);
  router.post('/api/info/deleteDBSingleRow', controller.info.deleteDBSingleRow);

};
