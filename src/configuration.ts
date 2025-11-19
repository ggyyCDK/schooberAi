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
    host: 'rm-bp1854x0z3445ng13zo.mysql.rds.aliyuncs.com',
    port: 3306,
    username: 'dms_user_47051c5',
    password: 'woshiGY3011',
    database: 'ai_mutil_message',
    charset: 'utf8mb4',
    driver: require('mysql2'),
    // connectorPackage:'mysql2',
    entities: [
      __dirname + '/BussinessLayer/**/Domain/**/*.ts',
      __dirname + '/BussinessLayer/**/Domain/**/*.js'
    ]
  });
}
