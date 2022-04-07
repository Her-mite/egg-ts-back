import { Service } from 'egg';

class Info extends Service {
  public async getWebsiteInfo(name: string) {
    return `what's up bro ${name}`;
  }
  public async getWebInfo(uid: string) {

    return `this is ${uid}`;
  }
}
module.exports = Info;
