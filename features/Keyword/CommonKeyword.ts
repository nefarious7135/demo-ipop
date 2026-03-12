import { expect, Locator, Page } from '@playwright/test';
import { locatorCommon } from '../Locator/Common';


export const UI = {

  // ************************************************* Login ZONE **********************************************************

  login: async (page: Page, username: string, password: string) => {
    await page.locator(locatorCommon.username).fill(username);
    await page.locator(locatorCommon.password).fill(password);
    await page.locator(locatorCommon.submitButton).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*home/);
  },

  // login จาก env key
  loginWithEnv: async (page: Page, userKey: string, passKey: string) => {
    const username = process.env[userKey]!;
    const password = process.env[passKey]!;
    console.log(`User ENV: ${username}`);
    console.log(`Password ENV: ${password}`);
    console.log('-------------------------');

    await UI.login(page, username, password);
  },

  // Wrapper login แต่ละ role
  login_Ess: async (page: Page) => UI.loginWithEnv(page, "ESS_User", "Pwd"),
  login_Mss: async (page: Page) => UI.loginWithEnv(page, "MSS_User", "Pwd"),
  login_Hr: async (page: Page) => UI.loginWithEnv(page, "HR_User", "Pwd"),

};

export function randomThaiName() {
  const names = [
    { th: "สมชาย", en: "Somchai" },
    { th: "สมศักดิ์", en: "Somsak" },
    { th: "อนันต์", en: "Anan" },
    { th: "วิชัย", en: "Wichai" },
    { th: "ณรงค์", en: "Narong" },
    { th: "กิตติ", en: "Kitti" },
    { th: "ธีรพล", en: "Teerapol" },
    { th: "ชัยวัฒน์", en: "Chaiwat" },
    { th: "พงศ์ศักดิ์", en: "Pongsak" },
    { th: "วรชัย", en: "Worachai" },
    { th: "ประเสริฐ", en: "Prasert" },
    { th: "สุชาติ", en: "Suchart" },
    { th: "ธนพล", en: "Thanapol" },
    { th: "วีระ", en: "Weera" },
    { th: "ไพโรจน์", en: "Pairote" },
    { th: "สุพจน์", en: "Supoj" },
    { th: "ปรีชา", en: "Preecha" },
    { th: "ศุภชัย", en: "Supachai" },
    { th: "เกรียงศักดิ์", en: "Kriangsak" },
    { th: "มนัส", en: "Manat" }
  ];

  const lastNames = [
    { th: "สุขใจ", en: "Sukjai" },
    { th: "ทองดี", en: "Thongdee" },
    { th: "วงศ์ชัย", en: "Wongchai" },
    { th: "ศรีสวัสดิ์", en: "Srisawat" },
    { th: "บุญมี", en: "Boonmee" },
    { th: "เกษมสุข", en: "Kasemsuk" },
    { th: "ศรีสมบัติ", en: "Srismbat" },
    { th: "จันทร์ดี", en: "Chandee" },
    { th: "แสงทอง", en: "Saengthong" },
    { th: "อินทร์แก้ว", en: "Inkaew" },
    { th: "บุญส่ง", en: "Boonsong" },
    { th: "พัฒนกุล", en: "Pattanakul" },
    { th: "วัฒนชัย", en: "Wattanachai" },
    { th: "ชัยมงคล", en: "Chaimongkol" },
    { th: "ศรีเจริญ", en: "Sricharoen" },
    { th: "จันทรา", en: "Chantra" },
    { th: "พงศ์ไพศาล", en: "Pongpaisan" },
    { th: "บุญฤทธิ์", en: "Boonrit" },
    { th: "แซ่ตั้ง", en: "Saetang" },
    { th: "แซ่ลิ้ม", en: "Saelim" }
  ];

  const first = names[Math.floor(Math.random() * names.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    firstNameTH: first.th,
    lastNameTH: last.th,
    firstNameEN: first.en,
    lastNameEN: last.en
  };
}

export function random4Digits(): string {
  return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
};

export function random4Chars(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

