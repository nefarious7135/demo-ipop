// 🔹 Core
import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import { Auth } from '../Common/AuthenticationFunction';

// 🔹 Keywords & Utils  
import { randomThaiName, random4Chars } from '../Keyword/CommonKeyword';

// 🔹 Pages
import { MovementPage } from '../Page/EmployeeMovement';

// 🔹 Locator
import { locatorCommon } from '../Locator/Common';
import { locatorEmp } from '../Locator/EmployeeProfile';
import { locatorTm } from '../Locator/TimeManagement';

// 🔹 Data
import { JSONFile } from '../Keyword/CommonFileKeyword';
import { consentTableHeaders } from '../Data/CommonData';

// option for checking in case
export let fileNames: any;
export let timeout: number = 1;
export let key: any;
export let currentMockData: any;
export let mock_data: any;
export let functions: any;

// 🔹 Functions
export let Add: any;
export let Edit: any;
export let Filter: any;
export let Role: string;
export let Channel: string;

export class FeatureHelper {
	Features: any;
	MAIN_URL: any;
	ENV: any;

	constructor(private page: Page) { }

	async Set_goto_Demo_Ipop(url?: string) {
		console.log('-------------------------');
		console.log('✅ Set_goto_Demo_Ipop');
		console.log('-------------------------');
		await this.page.goto(url || this.MAIN_URL);
	}

	async Login_Ess() {
		console.log('-------------------------');
		console.log('✅ Login_Ess');
		console.log('-------------------------');
		await Auth.AuthenticationFunctionEss(this.page);
	}

	async Login_Mss() {
		console.log('-------------------------');
		console.log('✅ Login_Mss');
		console.log('-------------------------');
		await Auth.AuthenticationFunctionMss(this.page);
	}

	async Login_Hr() {
		console.log('-------------------------');
		console.log('✅ Login_Hr');
		console.log('-------------------------');
		await Auth.AuthenticationFunctionHr(this.page);
	}

	async LoadLocalStorage() {
		let localStorage: any = await this.Read_Json_Data('LocalStorage/LocalStorage.json');
		if (localStorage === undefined || localStorage === null) {
			return;
		}
		return localStorage;
	}

	async Read_Json_Data(fileName: string) {
		const data = await JSONFile.readAndParseJson(fileName);
		return data;
	}

	async Mockdata(fileName: string, functions: string) {

		let filepath = await this.Read_Json_Data('config.json');
		fileNames = fileName;


		console.log('--------------------- init data ------------------');
		console.log(`✅ file Names: ${fileNames}`);
		console.log(`✅ functions: ${functions}`);

		key = `${fileNames}`;
		console.log(`✅ mapkey : ${key}`);

		let map: any = {
			'create-employee_movement': filepath.create_employee_movement,
			'update-employee_movement': filepath.update_employee_movement,
		};

		const selectedPath = map[key];
		console.log(`✅ Path json: ` + selectedPath)

		if (selectedPath) {
			await this.Set_data_init(selectedPath);
		} else {
			console.log(`❌ Current mock data : Unknown configuration: ${key}`);
		}

	}

	async Set_data_init(fileName: string) {
		console.log('-------------------------');
		console.log('✅ Set_data_init');
		console.log('-------------------------');

		mock_data = await this.Read_Json_Data(fileName);
		Add = mock_data.add
		Edit = mock_data.edit

	}

	async Select_Menu_Employee_Profile() {
		console.log('-------------------------');
		console.log('✅ Select_Employee_Profile');
		console.log('-------------------------');

		const menu = this.page.locator(locatorEmp.employee_profile);
		const subMenu = this.page.locator(locatorEmp.employee_profile_maintenance);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();
		await this.page.waitForTimeout(500);
		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Time_Data() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Time_Data');
		console.log('-------------------------');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.time_data);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();

		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Processing() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Processing');
		console.log('-------------------------');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.processing);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();

		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Time_Reports() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Time_Reports');
		console.log('-------------------------');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.timereport);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();

		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Employee_Movement() {
		console.log('-------------------------');
		console.log('✅ Select_Employee_Movement');
		console.log('-------------------------');

		const movementMenu = this.page.locator(locatorEmp.employee_movement);

		await expect(movementMenu).toBeVisible();
		await movementMenu.hover();
		await Promise.all([
			this.page.waitForURL(/.*employeemovement/),
			movementMenu.click()
		]);

	}

	async Create_New_Employee_Movement() {
		console.log('-------------------------');
		console.log('✅ Create_New_Employee_Movement');
		console.log('-------------------------');

		const movementPage = MovementPage(this.page);
		await this.page.locator(locatorEmp.new_movement_button).click();
		const name = randomThaiName();
		await movementPage.Movement_Type(Add.Movement_Type);
		await movementPage.Movement_Reason(Add.Movement_Reason);
		await movementPage.Title(Add.Title);
		await movementPage.First_Name_TH(name.firstNameTH);
		await movementPage.Last_Name_TH(name.lastNameTH);
		// await this.page.locator(locatorCommon.submitButton).click();
		// await expect(this.page.locator(locatorCommon.yesButton)).toBeVisible();
		// await this.page.locator(locatorCommon.yesButton).click();
		// await this.page.locator(locatorCommon.yesButton).click();
		await this.page.waitForTimeout(2000);

	}



}
