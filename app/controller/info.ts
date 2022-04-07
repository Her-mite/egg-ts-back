import { Controller } from 'egg';

class InfoController extends Controller {
  // post请求获取网站信息
  public async getWebsiteInfo() {
    const { ctx, service, app } = this;
    const reslt = await app.mysql.select('WebsiteInfo');
    console.log(reslt);
    // 获取路由上面预定义的参数
    const uid = ctx.params.uid || '';

    ctx.body = {
      name: ctx.request.body.name,
      age: ctx.request.body.age,
    };

    // 调用service定义的方法
    const result = await service.info.getWebsiteInfo(uid);
    if (result) {
      ctx.body = JSON.stringify(result);
    } else {
      ctx.body = 'can not find user!';
    }
  }

  // get 请求获取网站信息
  public async getWebInfo() {
    const { ctx, service } = this;
    // 获取路由上面预定义的参数
    const uid = ctx.query.uid || '';
    const result = await service.info.getWebInfo(uid);
    if (result) {
      ctx.body = JSON.stringify(result);
    } else {
      ctx.body = 'can not find user!';
    }
  }
}

module.exports = InfoController;
