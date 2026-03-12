import { test as base } from '@playwright/test';
import { FeatureHelper } from './Feature';
import path from 'path';

export let MAIN_URL: any;
// export let functions: any;

type TestFixtures = {
  Features: FeatureHelper;
  env: string;
  Functions: string;
};

export const test = base.extend<TestFixtures>({
  Features: async ({ page }, use) => {
    const features = new FeatureHelper(page);
    await use(features);
  },

  env: async ({ }, use, testInfo) => {
    const env = testInfo.project.name.toLowerCase().includes('demo') ? 'demo' : 'prod';
    await use(env);
  },

  Functions: async ({ }, use, testInfo) => {
    const Functions = testInfo.file.split(path.sep).pop()?.toLowerCase().includes('add') ? 'add' : 'edit';
    await use(Functions);
  },
  baseURL: async ({ }, use, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    await use(baseURL);
  },
});

test.beforeEach(async ({ Features, env, baseURL }, testInfo) => {
  const fullPath = testInfo.file;
  console.log(`✅ fullPath: ${fullPath}`);
  const noExt = path.parse(fullPath).name;
  console.log(`✅ noExt: ${noExt}`);
  const fileName = noExt.replace(/\.spec$/, '');
  console.log(`✅ fileName: ${fileName}`);

  let functions = '';

  // MAIN_URL ต้องมี ไม่งั้น throw ทันที (ช่วยจับ config พลาด)
  if (!baseURL) {
    throw new Error(
      `[config] "use.baseURL" is required for project "${testInfo.project.name}".`
    );
  }

  if (fileName.startsWith('create-')) functions = 'create';
  else if (fileName.startsWith('update-')) functions = 'update';
  else if (fileName.startsWith('delete-')) functions = 'delete';
  
  MAIN_URL = baseURL;

  console.log(`✅ ENV: ${env}`);
  console.log(`✅ MAIN_URL: ${MAIN_URL}`);
  await Features.Mockdata(fileName, functions);
});
