export const locatorEmp = {
    employee_profile: "//a[@class='nav-link nav-dropdown-toggle'][text()='Employee Profile']",
    employee_profile_maintenance: "//a[contains(@class,'nav-dropdown-toggle')  and (normalize-space()='Employee Profile Maintenance'  or normalize-space()='ปรับปรุงข้อมูลพนักงาน')]", 
    employee_movement: "//a[@href='/persadmin/employeemovement'][normalize-space()='Employee Movement']", 
    new_movement_button: "//button[@class='btn btn-md btn-primary'][normalize-space()='New Movement' or normalize-space()='สร้าง Movement']",
    movementType : "//ng-select[@id='eventTypeCode']",
    movementReason : "//ng-select[@id='eventReasonCode']",
    empTitle : "//ng-select[@id='newEmpTitle']",
    empFirstName : "//input[@formcontrolname='newEmpFirstName']",
    empLastName : "//input[@formcontrolname='newEmpLastName']",
    submitButton: "//button[@type='submit']",
    ddlemployee: "(//input[@role='combobox'])[2]",
    yesButton: "//button[@id='yesButton']",
    empCodegen :"//input[@formcontrolname='newEmpCode']"

}; 