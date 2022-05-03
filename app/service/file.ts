import { Service } from 'egg';
import fs = require('fs');
import child_process = require('child_process');


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
        if (!item.includes('.')) {
          return item;
        }
        return false;
      });
      return folderArray;
    } else if (queryType === 'mp3') {
      const folderArray = fileArray.filter(item => {
        if (!item.includes('.') || item.includes('mp3')) {
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

  // 上传本地文件
  public async uploadFile() {
    const stream = await this.ctx.getFileStream();

    // 获取上传路径和文件名
    const uploadFileName = stream.filename;
    const uploadFolderPath = stream.fields.uploadFolderPath;
    console.log('path', uploadFolderPath + '/' + uploadFileName);

    const target = uploadFolderPath + '/' + uploadFileName;

    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target);
      stream.pipe(remoteFileStream);
      // 监听error事件
      remoteFileStream.on('error', err => {
        console.log('pipError', err);
        reject(err);
      });

      // 监听写入完成事件
      remoteFileStream.on('finish', () => {
        resolve({ filename: uploadFileName, path: target });
      });
    });
    return result;
  }

  // 写入文件
  public async writeFile(dataString: string, filePath: string) {
    fs.writeFileSync(filePath, dataString);
    return '写入成功';
  }

  // 执行python
  public async execPython(pythonPath: string, args: string[], resultPath?: string) {
    console.log(`python3 ${pythonPath} ${args[0]} ${args[1]} "${args[2]}"`);
    child_process.execSync(`python3 ${pythonPath} ${args[0]} ${args[1]} "${args[2]}"`);
    if (resultPath) {
      const result = await this.getFileContent(resultPath);
      console.log(result, resultPath);

      return result;
    }
    console.log(resultPath);

    return '执行完成';

  }
}
module.exports = File;
