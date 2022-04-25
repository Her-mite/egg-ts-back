import { Controller } from 'egg';
class InfoController extends Controller {
  // 获取当前文件夹信息
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

  // 获取指定文件内容
  public async getFileContent() {
    const { ctx, service } = this;
    const filePath = ctx.query.filePath;

    const result = await service.file.getFileContent(filePath);
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }

  // 下载本地文件
  public async downloadFile() {
    const { ctx, service } = this;
    const { fileName, localFileName } = ctx.request.body;
    await service.file.downloadFile(fileName, localFileName);
  }

  // 上传文件
  public async uploadFile() {
    const result = this.service.file.uploadFile();
    if (result) {
      this.ctx.result = result;
    } else {
      throw ('result empty');
    }
  }

}

module.exports = InfoController;
