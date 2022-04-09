import { Service } from 'egg';

class Info extends Service {
  // 查询网站表全量数据
  public async getWebsiteInfo(tableName: string): Promise<EggMySQLSelectResult> {
    const { app } = this;
    const websiteInfo = await app.mysql.select(tableName);
    return websiteInfo;
  }

  // 插入数据
  public async insertWebsiteInfo(tableName: string, tableValue: object): Promise<EggMySQLInsertResult> {
    const { app } = this;
    const insertResult = await app.mysql.insert(tableName, tableValue);
    return insertResult;
  }

  public async getWebInfo(uid: string) {

    return `this is ${uid}`;
  }
}
module.exports = Info;
