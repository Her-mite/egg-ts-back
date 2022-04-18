import { Service } from 'egg';
import minioClient from '../utils/minioClient';
import fs = require('fs');
// import path = require('path');


class MinioService extends Service {
  // 获取对象存储所有桶名
  public async getBucketName() {
    return new Promise<object[]>((resolve, reject) => {
      minioClient.listBuckets(function (err, buckets) {
        if (err) {
          reject(err);
        }
        const bucketName = buckets.map(item => item.name);
        resolve(bucketName);
      });
    });
  }

  // 查询对象存储内容
  public async getObjectList(bucketName: string, prefix: string) {
    /**
     * @description 获取指定桶和前缀下的文件
     * @param  {string} bucketName 存储桶名称
     * @param  {string} prefix 要列出的对象的前缀。（可选，默认值是''）
     * @param  {string} recursive true代表递归查找，false代表不查找子文件
     */
    const stream = minioClient.listObjects(bucketName, prefix, false);
    const objectList: object[] = [];
    const objectListPromise = new Promise((resolve, reject) => {
      stream.on('data', (element: any) => {
        if (element.prefix) {
          objectList.unshift({ name: element.prefix.split('/').slice(-2)[0] + '/' });
        } else {
          // 对文件大小选择合适的单位进行展示
          const sizeUnit = ['B', 'KB', 'MB', 'GB'];
          let sizeFlag = 0;
          let size = element.size;
          while (size / 1024 > 1 && sizeFlag < 3) {
            sizeFlag++;
            size = (size / 1024).toFixed(2);
          }
          objectList.push({
            name: element.name.split('/').pop(), // 去除绝对路径文件名前缀
            size: size + sizeUnit[sizeFlag],
            lastModified: element.lastModified,
          });
        }
      });
      stream.on('end', () => {
        resolve(objectList);
      });

      stream.on('error', (err: Error) => {
        reject(err);
      });
    });
    const result = await objectListPromise;
    return result;
  }

  // 下载文件
  public async downloadObject(bucketName: string, romoteFileName: string, localFileName: string, ctx: any) {
    const fGetObjectPromise = new Promise(resolve => {
      minioClient.fGetObject(bucketName, romoteFileName, localFileName, function (err) {
        if (err) {
          console.log('error:reslt', err);
          throw err;
        }

        ctx.attachment(localFileName);
        ctx.set('Content-Type', 'application/octet-stream');
        ctx.body = fs.createReadStream(localFileName);
        fs.unlinkSync(localFileName);
        resolve(ctx);
      });
    });
    await fGetObjectPromise;
  }

  // 上传文件或新建文件夹
  public async uploadObject(fileName: string) {
    let uploadFileName: string;
    let stream: any;
    if (fileName) {
      uploadFileName = fileName;
      stream = '';
    } else {
      stream = await this.ctx.getFileStream();
      uploadFileName = stream.fields.uploadFileName;
    }

    // const target = path.join(this.config.baseDir, './uploads/', filename);
    await new Promise(resolve => {
      minioClient.putObject('software', uploadFileName, stream, function (_err, etag) {
        resolve(etag);
        // return console.log(err, etag); // err should be null
      });

      // // 创建文件写入流
      // const remoteFileStrem = fs.createWriteStream(target);
      // // 以管道方式写入流
      // stream.pipe(remoteFileStrem);

      // let errFlag;
      // // 监听error事件
      // remoteFileStrem.on('error', err => {
      //   reject(err);
      // });

      // // 监听写入完成事件
      // remoteFileStrem.on('finish', () => {
      //   if (errFlag) return;
      //   resolve({ filename, path: target });
      // });
    });
    this.ctx.body = { status: 200, message: '上传成功' };
  }

  // 删除文件
  public async removeObject(bucketName: string, remoteFileName: string) {
    console.log(remoteFileName);

    const removePromise = new Promise((resolve, reject) => {
      minioClient.removeObject(bucketName, remoteFileName, (err: Error) => {
        if (err) {
          console.log('Unable to remove object', err);
          reject(err);
          throw err;
        }
        const result = { status: 200, message: '删除成功' };
        resolve(result);
        return result;
      });
    });

    const result = await removePromise;
    return result;
  }

}
module.exports = MinioService;
