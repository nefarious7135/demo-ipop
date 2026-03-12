import { expect, Page } from '@playwright/test';
import { locatorEmp } from '../Locator/EmployeeProfile';


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
        await page.locator(locatorEmp.movementReason).click();
        await page.getByText(input, { exact: true }).click();
        console.log('✅ Movement_Reason: ', input);
    },

    Title: async (input: string) => {
        await page.locator(locatorEmp.empTitle).click();
        await page.getByText(input, { exact: true }).click();
        console.log('✅ Title: ', input);
    },

    First_Name_TH: async (input: string) => {
        await page.locator(locatorEmp.empFirstName).fill(input);
        console.log('✅ First_Name_TH: ', input);
    },

    Last_Name_TH: async (input: string) => {
        await page.locator(locatorEmp.empLastName).fill(input);
        console.log('✅ Last_Name_TH: ', input);
    },


});







