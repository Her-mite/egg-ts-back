// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInfo from '../../../app/controller/info';

declare module 'egg' {
  interface IController {
    info: ExportInfo;
  }
}
