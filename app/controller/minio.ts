import { Controller } from 'egg';

class MinioController extends Controller {
  // 获取桶名列表
  public async getBucketName() {
    const { ctx, service } = this;
    const result = await service.minio.getBucketName();
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }

  // 获取指定位置的数据
  public async getObjectList() {
    const { ctx, service } = this;
    const bucketName = ctx.query.bucketName;
    const prefix = ctx.query.prefix || '';

    // 调用service定义的方法
    const result = await service.minio.getObjectList(bucketName, prefix);
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }


  // 以文件形式下载
  public async downloadObject() {
    const { ctx, service } = this;
    const { bucketName, romoteFileName, localFileName } = ctx.request.body;

    /**
     * @description   // 以文件形式下载
     * @param {string} bucketName 桶名
     * @param {string} uploadFileName 远程文件名
     * @param {string} localFileName 下载到本地文件名
     */
    await service.minio.downloadObject(bucketName, romoteFileName, localFileName, ctx);
  }

  // 文件流上传
  public async uploadObject() {
    const { ctx, service } = this;
    const { fileName } = ctx.request.body;
    await service.minio.uploadObject(fileName);
  }

  // 删除文件
  public async removeObject() {

    const { ctx, service } = this;
    const { bucketName, remoteFileName } = ctx.request.body;
    console.log('bucketName, remoteFileName', bucketName, remoteFileName);

    const result = await service.minio.removeObject(bucketName, remoteFileName);
    if (result) {
      ctx.result = result;
    } else {
      throw ('result empty');
    }
  }
}

module.exports = MinioController;
