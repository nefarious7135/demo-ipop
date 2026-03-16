// 🔹 Core
import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import { Auth } from '../Common/AuthenticationFunction';

// 🔹 Keywords & Utils  
import { randomThaiName, generateThaiIdCard, generateAccountNumber } from '../Keyword/CommonKeyword';

// 🔹 Pages
import { MovementPage } from '../Page/EmployeeMovement';

// 🔹 Locator
import { locatorCommon } from '../Locator/Common';
import { locatorEmp } from '../Locator/EmployeeProfile';
import { locatorTm } from '../Locator/TimeManagement';

// 🔹 Data
import { JSONFile } from '../Keyword/CommonFileKeyword';
import { data_doc } from '../Data/CommonData';

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
// export let Name: any;

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

	async setDataForTest() {
		const Name = await randomThaiName();
		const idCard = generateThaiIdCard();
		const accountNumber = generateAccountNumber();
		await JSONFile.updateJsonFile('LocalStorage/LocalStorage.json', {
			firstNameTH: Name.firstNameTH,
			lastNameTH: Name.lastNameTH,
			firstNameEN: Name.firstNameEN,
			lastNameEN: Name.lastNameEN,
			identityNumber: idCard,
			accountNumber: accountNumber

		});
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

		await this.page.waitForLoadState('networkidle');
		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();
		await this.page.waitForLoadState('networkidle');
		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Time_Data() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Time_Data');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.time_data);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();
		await this.page.waitForTimeout(500);
		await this.page.waitForLoadState('networkidle');
		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Processing() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Processing');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.processing);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();
		await this.page.waitForTimeout(500);
		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Time_Management_Sub_Time_Reports() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Time_Management_Sub_Time_Reports');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const menu = this.page.locator(locatorTm.time_management);
		const subMenu = this.page.locator(locatorTm.timereport);

		await expect(menu).toBeVisible();
		await menu.hover();
		await menu.click();
		await this.page.waitForTimeout(500);
		await expect(subMenu).toBeVisible();
		await subMenu.click();

	}

	async Select_Menu_Employee_Movement() {
		console.log('-------------------------');
		console.log('✅ Select_Menu_Employee_Movement');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

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
		await this.page.waitForLoadState('networkidle');

		await this.setDataForTest();

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		const movementPage = MovementPage(this.page);
		await this.page.locator(locatorEmp.new_movement_button).click();

		await movementPage.Movement_Type(Add.Movement_Type);
		await movementPage.Movement_Reason(Add.Movement_Reason);
		await this.page.waitForTimeout(500);
		const newEmpCode = await this.page.locator(locatorEmp.empCodegen).inputValue();
		console.log(`✅ Generated Employee Code: ${newEmpCode}`);
		await JSONFile.updateJsonFile('LocalStorage/LocalStorage.json', {
			EmpCode: newEmpCode,
		});
		await movementPage.Title(Add.Title);
		await movementPage.First_Name_TH(localStorage.firstNameTH);
		await movementPage.Last_Name_TH(localStorage.lastNameTH);
		await this.page.locator(locatorCommon.submitButton).click();
		await this.page.locator(locatorCommon.yesButton).click();
		await this.page.locator(locatorCommon.yesButton).click();

	}

	async Filter_Employee_Movement() {
		console.log('-------------------------');
		console.log('✅ Filter_Employee_Movement');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		await this.page.locator(locatorCommon.empCode).click();
		await this.page.keyboard.type(localStorage.EmpCode);
		await this.page.keyboard.press("Enter");
		await this.page.locator(locatorCommon.goButton).click();
		await this.page.locator(`//div[@col-id='employeeText'][contains(.,'${localStorage.EmpCode}')]`).click();

	}

	async Fill_Personal_Assignment_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Assignment_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const movementPage = MovementPage(this.page);

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		await movementPage.Company(Add.Company);
		await movementPage.Organization(Add.Organization);
		// await movementPage.Position(Add.Position);
		await movementPage.FTE(Add.FTE);
		await movementPage.Job_Level(Add.Job_Level);
		await movementPage.Payroll_Group(Add.Payroll_Group);
		await movementPage.Employee_Type(Add.Employee_Type);
		await movementPage.Employee_Subtype(Add.Employee_Subtype);
		await movementPage.Area(Add.Area);
		await movementPage.Subarea(Add.Subarea);
		await movementPage.Cost_Center(Add.Cost_Center);
		// save
		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Fill_Personal_Data_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Data_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const movementPage = MovementPage(this.page);

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		await movementPage.First_Name_EN(localStorage.firstNameEN);
		await movementPage.Last_Name_EN(localStorage.lastNameEN);
		await movementPage.Marital_Status(Add.Marital_Status);
		await movementPage.Birth_Date(Add.Birth_Date);
		await movementPage.Religion(Add.Religion);
		await movementPage.Attachment_Type('Other Documents', data_doc.image.OtherDoc);
		await movementPage.Attachment_Type('Official Documents', data_doc.image.OfficialDoc);
		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Fill_Personal_ID_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_ID_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');
		const identityNumber = this.page.locator(locatorEmp.identityNumber);

		await expect(identityNumber).toBeVisible();
		await identityNumber.hover();
		await identityNumber.click();

		const movementPage = MovementPage(this.page);

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		await movementPage.Identity_Number(localStorage.identityNumber);
		await movementPage.Attachment_Type('Official Documents', data_doc.image.OfficialDoc);
		await movementPage.Attachment_Type('Employment Document', data_doc.image.EmploymentDoc);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();

	}

	async Fill_Social_Security_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Social_Security_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await this.page.locator(locatorCommon.skipButton).click();
		await this.page.locator(locatorCommon.yesButton).click();
	}

	async Fill_Employee_Welfare_Fund_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Employee_Welfare_Fund_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await this.page.locator(locatorCommon.skipButton).click();
		await this.page.locator(locatorCommon.yesButton).click();
	}

	async Fill_Personal_Address_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Address_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const movementPage = MovementPage(this.page);

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}

		await movementPage.Province(Add.Province);
		await movementPage.District(Add.District);
		await movementPage.Sub_District(Add.Sub_District);
		await movementPage.Attachment_Type('Employment Document', data_doc.image.EmploymentDoc);

		await this.page.locator(locatorCommon.skipButton).click();
		await this.page.locator(locatorCommon.yesButton).click();
	}

	async Fill_Personal_Communication_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Communication_Table');
		console.log('-------------------------');
		await this.page.waitForTimeout(2000);

		const element = this.page.locator(locatorEmp.email);

		await this.page.waitForLoadState('networkidle');
		await expect(element).toBeVisible();
		await element.hover();
		await element.click();

		const movementPage = MovementPage(this.page);

		await movementPage.Email(Add.Email);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Fill_Personal_Family_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Family_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');
		const Name = await randomThaiName();
		const movementPage = MovementPage(this.page);
		// father
		await movementPage.Country(Add.Country);
		await movementPage.Gender("Male");
		await movementPage.Family_Title("Mister");
		await movementPage.Family_First_Name_TH(Name.firstNameTH);
		await movementPage.Family_Last_Name_TH(Name.lastNameTH);
		await movementPage.Family_First_Name_EN(Name.firstNameEN);
		await movementPage.Family_Last_Name_EN(Name.lastNameEN);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton1 = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton1.waitFor({ state: 'visible' });
		await yesButton1.click();
		// popup รอบสอง
		await yesButton1.waitFor({ state: 'visible' });
		await yesButton1.click();

		// Mother
		await movementPage.Country(Add.Country);
		await movementPage.Gender("Female");
		await movementPage.Family_Title("Miss");
		await movementPage.Family_First_Name_TH(Name.firstNameTH);
		await movementPage.Family_Last_Name_TH(Name.lastNameTH);
		await movementPage.Family_First_Name_EN(Name.firstNameEN);
		await movementPage.Family_Last_Name_EN(Name.lastNameEN);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton2 = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton2.waitFor({ state: 'visible' });
		await yesButton2.click();
		// popup รอบสอง
		await yesButton2.waitFor({ state: 'visible' });
		await yesButton2.click();
	}

	async Fill_Personal_Date_Specification_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Date_Specification_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await this.page.locator(locatorCommon.skipButton).click();
		await this.page.locator(locatorCommon.yesButton).click();
	}

	async Fill_Personal_Bank_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Personal_Bank_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		const localStorage = await this.LoadLocalStorage();
		if (!localStorage) {
			console.log('No localStorage found');
			return;
		}
		const movementPage = MovementPage(this.page);

		await movementPage.Bank(Add.Bank);
		await this.page.locator(locatorEmp.accountNumber).fill(localStorage.accountNumber);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Fill_Basic_Pay_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Basic_Pay_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');
		const movementPage = MovementPage(this.page);

		await movementPage.Amount(Add.Amount);

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Fill_Tax_Allowance_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Tax_Allowance_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		await this.page.locator(locatorCommon.yesButton).click();
	}

	async Fill_Time_ClockID_Table() {
		console.log('-------------------------');
		console.log('✅ Fill_Time_ClockID_Table');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await this.page.locator(locatorCommon.saveButton).click();
		const yesButton = this.page.getByRole('button', { name: 'Yes' }).first();
		// popup รอบแรก
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
		// popup รอบสอง
		await yesButton.waitFor({ state: 'visible' });
		await yesButton.click();
	}

	async Verify_Completed_Message() {
		console.log('-------------------------');
		console.log('✅ Verify_Completed_Message');
		console.log('-------------------------');
		await this.page.waitForLoadState('networkidle');

		await expect(this.page.locator(locatorCommon.completedMessage)).toBeVisible();
	}
}
