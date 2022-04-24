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

  public async getFileContent(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  }

}
module.exports = File;
