import { test } from '@playwright/test';
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

test('Assert manager can Login', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.openLoginPage();
  await addCustomerPage.clickBankManagerLoginButton();
  await addCustomerPage.assertAddCustomerButtonVisible();
  await addCustomerPage.assertOpenAccountButtonVisible();
  await addCustomerPage.assertCustomersButtonVisible();



  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
});
