import { expect, Page } from '@playwright/test';
import { locatorEmp } from '../Locator/EmployeeProfile';
import { locatorCommon } from '../Locator/Common';
import { optional } from '../Keyword/CommonKeyword';


export const MovementPage = (page: Page) => ({

    Movement_Type: async (input: string) => {
        const movementOptions = [
            "Completion Of Probation",
            "Data Change",
            "Hire",
            "Job Change",
            "Probation",
            "Promotion",
            "Rehire",
            "Termination",
            "MovementEN",
            "Transfer",
            "EmployeeWelfareFund"
        ];

        if (!movementOptions.includes(input)) {
            throw new Error(`Movement Type not found in option list: ${input}`);
        }

        await page.locator(locatorEmp.movementType).click();
        await page.getByText(input, { exact: true }).click();

        console.log('✅ Movement_Type:', input);
    },

    Movement_Reason: async (input: string) => {
        console.log('✅ Movement_Reason: ', input);
        await page.locator(locatorEmp.movementReason).click();
        await page.getByText(input, { exact: true }).click();
    },

    Title: async (input: string) => {
        console.log('✅ Title: ', input);
        await page.locator(locatorEmp.empTitle).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    First_Name_TH: async (input: string) => {
        console.log('✅ First_Name_TH: ', input);
        await page.locator(locatorEmp.empFirstName).fill(input);
    },

    Last_Name_TH: async (input: string) => {
        console.log('✅ Last_Name_TH: ', input);
        await page.locator(locatorEmp.empLastName).fill(input);
    },

    Company: async (input: string) => {
        console.log('✅ Company: ', input);
        await page.locator(locatorEmp.empCompany).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Organization: async (input: string) => {
        console.log('✅ Organization: ', input);
        await page.locator(locatorCommon.browseOrg).click();
        await expect(page.locator("//div[@class='modal-content']")).toBeVisible();
        await page.locator(`//label[@class='mat-checkbox-layout' and contains(.,'${input}')]`).click();
        await page.locator(locatorCommon.okButton).click();
    },

    Position: async (input: string) => {
        console.log('✅ Position: ', input);
        await page.locator(locatorEmp.empPosCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    FTE: async (input: string) => {
        console.log('✅ FTE: ', input);
        await page.locator(locatorEmp.empFTE).fill(input);
    },

    Job_Level: async (input: string) => {
        console.log('✅ Job_Level: ', input);
        await page.locator(locatorEmp.empjobLevel).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Payroll_Group: async (input: string) => {
        console.log('✅ Payroll_Group: ', input);
        await page.locator(locatorEmp.payrollAreaCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Employee_Type: async (input: string) => {
        console.log('✅ Employee_Type: ', input);
        await page.locator(locatorEmp.empGroupCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Employee_Subtype: async (input: string) => {
        console.log('✅ Employee_Subtype: ', input);
        await page.locator(locatorEmp.empSubGroupCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Area: async (input: string) => {
        console.log('✅ Area: ', input);
        await page.locator(locatorEmp.persAreaCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Subarea: async (input: string) => {
        console.log('✅ Subarea: ', input);
        await page.locator(locatorEmp.persSubAreaCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Cost_Center: async (input: string) => {
        console.log('✅ Cost_Center: ', input);
        await page.locator(locatorEmp.costCenter).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    First_Name_EN: async (input: string) => {
        console.log('✅ First_Name_EN: ', input);
        await page.locator(locatorEmp.empFirstNameEn).fill(input);
    },

    Last_Name_EN: async (input: string) => {
        console.log('✅ Last_Name_EN: ', input);
        await page.locator(locatorEmp.empLastNameEn).fill(input);
    },

    Marital_Status: async (input: string) => {
        console.log('✅ Marital_Status: ', input);
        await page.locator(locatorEmp.maritalCode).click();
        await page.getByText(input, { exact: true }).click();
    },

    Birth_Date: async (input: string) => {
        console.log('✅ Birth_Date: ', input);
        await page.locator(locatorEmp.birthDate).fill(input);
    },

    Religion: async (input: string) => {
        console.log('✅ Religion: ', input);
        await page.locator(locatorEmp.religionCode).click();
        await page.getByText(input, { exact: true }).click();
    },

    Attachment_Type: async (Doctype: string, images: any) => {
        console.log('✅ Attachment_Type: ', Doctype);
        for (const image of images) {
            console.log('image', image);
            await page.locator(locatorEmp.attachTypeCode).click();
            await page.getByRole('option', { name: Doctype }).click();
            await optional.attachFile(page, locatorEmp.fileName, image);
            await page.locator(locatorCommon.attachButton).click();
        }
    },

    Identity_Number: async (input: string) => {
        console.log('✅ Identity_Number: ', input);
        await page.locator(locatorEmp.identityNumber).fill(input);
    },

    Province: async (input: string) => {
        console.log('✅ Province: ', input);
        await page.locator(locatorEmp.province).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    District: async (input: string) => {
        console.log('✅ District: ', input);
        await page.locator(locatorEmp.district).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Sub_District: async (input: string) => {
        console.log('✅ Sub_District: ', input);
        await page.locator(locatorEmp.subDistrict).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Email: async (input: string) => {
        console.log('✅ Email: ', input);
        await page.locator(locatorEmp.email).fill(input);
    },

    Country: async (input: string) => {
        console.log('✅ Country: ', input);
        await page.locator(locatorEmp.countryCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Gender: async (input: string) => {
        console.log('✅ Gender: ', input);
        await page.locator(locatorEmp.genderCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Family_Title: async (input: string) => {
        console.log('✅ Family_Title: ', input);
        await page.locator(locatorEmp.titleSelected).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },


    Family_First_Name_TH: async (input: string) => {
        console.log('✅ Family_First_Name_TH: ', input);
        await page.locator(locatorEmp.firstFName).fill(input);
    },

    Family_Last_Name_TH: async (input: string) => {
        console.log('✅ Family_Last_Name_TH: ', input);
        await page.locator(locatorEmp.firstLName).fill(input);
    },

    Family_First_Name_EN: async (input: string) => {
        console.log('✅ Family_First_Name_EN: ', input);
        await page.locator(locatorEmp.secondFName).fill(input);
    },

    Family_Last_Name_EN: async (input: string) => {
        console.log('✅ Family_Last_Name_EN: ', input);
        await page.locator(locatorEmp.secondLName).fill(input);
    },

    Bank: async (input: string) => {
        console.log('✅ Bank: ', input);
        await page.locator(locatorEmp.bankKeyCode).click();
        await page.keyboard.type(input);
        await page.keyboard.press("Enter");
    },

    Amount: async (input: string) => {
        console.log('✅ Amount: ', input);
        await page.locator(locatorEmp.amount).fill(input);
    },

});







