export const locatorCommon = {
    username: "input[formcontrolname='username']",
    password: "input[formcontrolname='password']",
    submitButton: "button[type='submit']",
    yesButton: "//button[@id='yesButton']",
    goButton: "//button[@type='button' and (normalize-space()='Go' or normalize-space()='ตกลง')]",
    empCode: "//ng-select[@id='empCode']",
    saveButton: "//button[@type='button' and normalize-space()='Save']",
    attachButton: "//button[@type='button' and normalize-space()='Attach']",
    skipButton: "//button[@type='button' and normalize-space()='Skip']",
    completedMessage: "//div[@id='stepDetailMessageDiv' and normalize-space()='This employee movement has been completed.']",
    browseOrg: "//button[@type='button' and (normalize-space()='Browse Org' or normalize-space()='เลือกหน่วยงาน')]",
    okButton: "//button[@type='button' and (normalize-space()='Ok' or normalize-space()='ตกลง')]"
}; 
