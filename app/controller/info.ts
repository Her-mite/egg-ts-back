import { Controller } from 'egg';
class InfoController extends Controller {
  // post请求获取网站信息
  public async getWebsiteInfo() {
    const { ctx, service } = this;

    // 获取路由上面预定义的参数
    const tableName: string = ctx.request.body.tableName;
    if (!tableName || typeof (tableName) !== 'string') {
      throw ('table name error');
    }
    // 调用service定义的方法
    const result = await service.info.getWebsiteInfo(tableName);
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }

  // 新增表数据
  public async insertWebsiteInfo() {
    const { ctx, service } = this;
    const { tableName, tableValue } = ctx.request.body;
    try {
      const result = await service.info.insertWebsiteInfo(tableName, tableValue);
      ctx.result = result;
    } catch (error) {
      throw error;
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
