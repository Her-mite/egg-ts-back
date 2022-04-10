import { Controller } from 'egg';
class InfoController extends Controller {
  // post请求获取网站信息
  public async getWebsiteInfo() {
    const { ctx, service } = this;
    const tableName: string = ctx.query.tableName;

    // 获取路由上面预定义的参数
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

  // 删除表指定一列
  public async deleteDBSingleRow() {
    const { ctx, service } = this;
    const { tableName, deleteCol, deleteValue } = ctx.request.body;
    console.log('qweq', tableName, deleteCol, deleteValue);

    try {
      const result = await service.info.deleteDBSingleRow(tableName, deleteCol, deleteValue);
      ctx.result = result;
      console.log('qqqqq', result);

    } catch (error) {
      throw (error);
    }
  }

}

module.exports = InfoController;
