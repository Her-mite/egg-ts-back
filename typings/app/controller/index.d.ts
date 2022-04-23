// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile from '../../../app/controller/file';
import ExportInfo from '../../../app/controller/info';
import ExportMinio from '../../../app/controller/minio';

declare module 'egg' {
  interface IController {
    file: ExportFile;
    info: ExportInfo;
    minio: ExportMinio;
  }
}
