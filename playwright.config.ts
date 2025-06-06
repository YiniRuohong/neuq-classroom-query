import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 600000,  // 全局测试超时设置为10分钟
  expect: {
    timeout: 30000,  // 断言超时设置为30秒
  },
  use: {
    navigationTimeout: 30000,  // 导航超时设置为30秒
    actionTimeout: 15000,    // 动作超时设置为15秒
    browserName: 'chromium',
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser',
    headless: true,
    ignoreHTTPSErrors: true,
  },
  retries: 0,  // 不重试失败的测试
  reporter: 'list',  // 使用列表形式的报告
  testDir: './tests',  // 测试文件目录
};

export default config;