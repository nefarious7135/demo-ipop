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
    await Features.Select_Employee_Movement();
    await Features.Create_New_Employee_Movement();
    
  });


});