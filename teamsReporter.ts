import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
// import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { JSONFile } from './features/Keyword/CommonFileKeyword';


const url = 'https://webhookbot.c-toss.com/api/bot/webhooks/e76d3b5c-1d43-4704-8cde-36e9a885f54b';
/**
 * TeamsReporter is a custom Playwright reporter that sends test results to a Microsoft Teams channel.
 * It collects passed and failed test cases, along with their metadata, and formats the results
 * into a message that is sent via a webhook.
 */

class TeamsReporter implements Reporter {
  private passedTests: string[] = [];
  private failedTests: {
    title: string;
    file?: string;
    retry?: number;
    tags?: string[];
    error?: string;
  }[] = [];


  private describe = '';
  private projectName = '';
  private environment = '';
  private lastTestTitle = '';
  private lastTestFile = '';
  private tags: string[] = [];
  private runner: string = 'Sutat-Upadaeng';


  async onTestEnd(test: TestCase, result: TestResult) {
    const title = test.title;
    const file = test.location.file;
    const retry = result.retry;
    const fileSafeTitle = title.replace(/\W+/g, '_');
    const metaPath = path.join(process.cwd(), '.test-meta', `${fileSafeTitle}.json`);

    let tags: string[] = [];
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      this.describe = meta.describe || '';
      this.projectName = meta.projectName || '';
      this.environment = meta.baseURL || '';
      this.tags = meta.tags || [];
    }

    this.lastTestTitle = title;
    this.lastTestFile = file;

    if (result.status === 'passed') {
      this.passedTests.push(title);
    } else if (result.status === 'failed') {
      this.failedTests.push({ title, file });
    }
  }

  async onEnd() {

    const timestamp = new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',     // ✅ 2025
      month: '2-digit',    // ✅ 07
      day: '2-digit',      // ✅ 04
      hour: '2-digit',     // ✅ 17
      minute: '2-digit',
      hour12: false        // ✅ ให้เป็น 24 ชม.
    });
    const data = JSONFile.readAndParseJson('LocalStorage/LocalStorage.json')

    const PassedDetails = this.passedTests.map(t =>
      `- ${t}`
    ).join('\n\n')

    const failedDetails = this.failedTests.map(t =>
      `- ${t.title}\n
      📄 File: ${t.file}\n`
    ).join('\n\n');

    // await fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     text: `
    //     🗂 Runner: ${this.runner}
    //     🗂 Project: ${this.describe}
    //     📁 TestType: ${this.projectName} - ${this.tags}
    //     🌐 Environment: ${this.environment}
    //     📄 File: ${this.lastTestFile}
    //     ⏰ Time: ${timestamp}
    //     ------------------------------------
    //     📊 Test Case Summary
    //     ------------------------------------
    //     ✅ รวมทั้งหมด: ${this.passedTests.length + this.failedTests.length}
    //     ------------------------------------
    //     ✅ ผ่านทั้งหมด: ${this.passedTests.length}
    //     ❌ ไม่ผ่านทั้งหมด: ${this.failedTests.length}
    //     ------------------------------------
    //     📁 Test Data
    //     ------------------------------------
    //     👉 LOS App No : ${data.app_los_app_no}
    //     👉 Sale App No : ${data.app_sale_app_no}
    //     👉 Thai Id : ${data.app_identification_number}
    //     ------------------------------------\n\n` +
    //       (this.failedTests.length > 0 ? `❌ รายการที่ล้มเหลว:\n\n${failedDetails}\n\n` : '') +
    //       (this.passedTests.length > 0 ? `✅ รายการที่ผ่าน:\n\n${PassedDetails}\n\n` : '')
    //   })
    // });
  
    console.log('[📢 Reporter] ส่งสรุปพร้อม detail แล้ว');
  }
}

export default TeamsReporter;
