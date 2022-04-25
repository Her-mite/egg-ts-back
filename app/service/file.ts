import { Service } from 'egg';
import fs = require('fs');

class File extends Service {
  // 获取当前目录下文件和文件夹名
  public async getCurrentFiles(currentPath: string, queryType: string): Promise<string[]> {
    const filePromise: Promise<string[]> = new Promise((resolve, reject) => {
      fs.readdir(currentPath, 'utf8', (err: any, data) => {
        if (err) {
          reject(err);
          console.log('err', err);
        }
        resolve(data);
      });
    });
    const fileArray: string[] = await filePromise;
    if (queryType === 'folder') {
      const folderArray = fileArray.filter(item => {
        if (item.includes('.')) {
          return item;
        }
        return false;
      });
      return folderArray;
    }
    return fileArray;
  }

  // 获取指定文件内容
  public async getFileContent(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  }

  // 下载本地文件
  public async downloadFile(fileName: string, localFileName: string) {
    const { ctx } = this;
    console.log(fileName, localFileName);
    ctx.attachment(fileName);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(localFileName);
  }

}
module.exports = File;
