import { Controller } from 'egg';
class InfoController extends Controller {
  public async getCurrentFiles() {
    const { ctx, service } = this;
    const currentPath: string = ctx.query.currentPath;
    const queryType: string = ctx.query.queryType;

    // 调用service定义的方法
    const result = await service.file.getCurrentFiles(currentPath, queryType);
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }

}

module.exports = InfoController;
