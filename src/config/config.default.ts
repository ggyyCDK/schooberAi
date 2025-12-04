import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1762174792249_3022',
  egg: {
    port: 7001,
  },
  cors: {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,OPTIONS',

    credentials: true,
  },
  security: {
    csrf: false,
    xframe: {
      enable: false
    }
  },
  swagger: {
    title: '代码审查API',
    description: '代码审查API',
    version: '1.0.0',
  },
  httpProxy: {
    enable: true,
    default: {
      target: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions/v1/$1',
      ingoreHeaders: {
        origin: true,
        Origin: true
      },
      strategy: {

      }
    }
  }
} as MidwayConfig;
