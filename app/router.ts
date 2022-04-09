import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/getWebsiteInfo', controller.info.getWebsiteInfo);
  router.post('/insertWebsiteInfo', controller.info.insertWebsiteInfo);

};
