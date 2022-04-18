import { Service } from 'egg';

class Info extends Service {
  // 查询网站表全量数据
  public async getWebsiteInfo(tableName: string, type: string): Promise<EggMySQLSelectResult> {
    const { app } = this;
    const websiteInfo = await app.mysql.select(tableName, {
      where: {
        Type: type,
      },
    });
    return websiteInfo;
  }

  // 插入数据
  public async insertWebsiteInfo(tableName: string, tableValue: object): Promise<EggMySQLInsertResult> {
    const { app } = this;
    const insertResult = await app.mysql.insert(tableName, tableValue);
    return insertResult;
  }

  // 删除指定数据
  public async deleteDBSingleRow(tableName: string, tableCol: string, tableValue: string): Promise<EggMySQLUpdateResult> {
    const { app } = this;
    const deleteResult = await app.mysql.delete(tableName, {
      [tableCol]: tableValue,
    });
    return deleteResult;
  }
}
module.exports = Info;
