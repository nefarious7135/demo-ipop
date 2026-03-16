import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  reporter: [
    ['html', { open: 'always' }],
    ['json', { outputFile: 'playwright-report/results.json' }]
    //['./teamsReporter.ts']
  ],
  expect: {
    timeout: 10000
  },
  timeout: 200000, // 🕒 timeout ของ test ทั้งหมด
  use: {
    screenshot: 'only-on-failure',
    video: 'on',
    headless: true,
    actionTimeout: 10000,    // 🕒 timeout ของ action เช่น click(), fill()
    navigationTimeout: 40000,
    trace: 'on-first-retry',
    // launchOptions: {
    //   slowMo: 1000, // 🐢 ลดความเร็วของการกระทำเพื่อให้เห็นชัดเจนขึ้น
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Demo-Ipop',
      use: {
        baseURL: 'https://demo.ipop.iamconsulting.co.th',
        viewport: { width: 1800, height: 900 },
      },
    },
  ],
});
