import { Configuration, App, IMidwayApplication } from '@midwayjs/core';
import * as egg from '@midwayjs/web';
import { join } from 'path';
import * as crossDomain from '@midwayjs/cross-domain';
import * as swagger from '@midwayjs/swagger';

import { createConnection } from 'typeorm';

@Configuration({
  imports: [
    egg,
    crossDomain,
    swagger
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App()
  app;

  async onReady() {
    this.app.connection = await initConnection(this.app);

  }

}
const initConnection = async (app: IMidwayApplication) => {
  return await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'woshiGY3011',
    database: 'ai_mutil_message',
    charset: 'utf8mb4',
    driver: require('mysql2'),
    // connectorPackage:'mysql2',

    // MySQL2 驱动的连接池配置
    extra: {
      connectionLimit: 10,          // 最大连接数
      waitForConnections: true,     // 等待可用连接
      queueLimit: 0,                // 队列限制（0 = 无限制）
      connectTimeout: 60000,        // 连接超时 60秒
      acquireTimeout: 60000,        // 获取连接超时 60秒
      timeout: 60000,               // 查询超时 60秒
    },

    // TypeORM 配置
    maxQueryExecutionTime: 30000,   // 最大查询执行时间 30秒

    // 实体配置
    entities: [
      __dirname + '/BussinessLayer/**/Domain/**/*.ts',
      __dirname + '/BussinessLayer/**/Domain/**/*.js'
    ],

    // 日志配置（生产环境建议关闭或只记录错误）
    logging: ['error', 'warn'],

    // 同步配置（生产环境务必设为 false）
    synchronize: false,
  });
}
