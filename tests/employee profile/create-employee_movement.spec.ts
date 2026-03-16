import { test } from '../../features/Feature/Setup';
test.describe.configure({ mode: 'serial' });


test.describe('Demo IPOP - Dev', () => {
  test.beforeEach(async ({ Features, baseURL }) => {
    // Open Browser and Go to Demo Ipop
    await Features.Set_goto_Demo_Ipop(baseURL);
  });


  test('Create New Employee Movement', async ({ Features }) => {
    // Login ด้วย role Hr
    await Features.Login_Hr();
    await Features.Select_Menu_Employee_Profile();
    await Features.Select_Menu_Employee_Movement();
    await Features.Create_New_Employee_Movement();
    await Features.Filter_Employee_Movement();
    await Features.Fill_Personal_Assignment_Table();
    await Features.Fill_Personal_Data_Table();
    await Features.Fill_Personal_ID_Table();
    await Features.Fill_Social_Security_Table();
    await Features.Fill_Employee_Welfare_Fund_Table();
    await Features.Fill_Personal_Address_Table();
    await Features.Fill_Personal_Communication_Table();
    await Features.Fill_Personal_Family_Table();
    await Features.Fill_Personal_Date_Specification_Table();
    await Features.Fill_Personal_Bank_Table();
    await Features.Fill_Basic_Pay_Table();
    await Features.Fill_Tax_Allowance_Table();
    await Features.Fill_Time_ClockID_Table();
    await Features.Verify_Completed_Message();

  });


});