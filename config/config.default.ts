import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.cluster = {
    listen: {
      path: '',
      port: 7071,
      hostname: '0.0.0.0',
    },
  };
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649260408904_4081';

  // TODO 修改为前端传参 https://blog.csdn.net/qq_31676725/article/details/115653645
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置mysql
  config.mysql = {
    client: {
      host: '1.117.188.206',
      port: '3306',
      // 用户名
      user: 'root',
      password: 'Qing9283',
      // 数据库名
      database: 'hujq_db',
    },
    // 是否加载到 app 上,默认开启
    app: true,
    // 是否加载到 agent 上,默认关闭
    agent: false,
  };

  // add your egg config in here
  config.middleware = ['errorHandler'];
  config.errorHandler = {
    ignore: ['/api/minio/downloadObject', '/api/minio/uploadObject'],
  };

  // 上传文件类型配置
  config.multipart = {
    fileExtensions: [
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.txt',
      '.xml',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
      '.md',
    ],
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
