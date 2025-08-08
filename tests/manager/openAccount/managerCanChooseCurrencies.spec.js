import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

test('Assert manager can choose currencies for account', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.openAccountPage();
  await addCustomerPage.selectCurrencyDropDown('Dollar');
  await addCustomerPage.assertSelectedCurrency('Dollar');
  await addCustomerPage.selectCurrencyDropDown('Pound');
  await addCustomerPage.assertSelectedCurrency('Pound');
  await addCustomerPage.selectCurrencyDropDown('Rupee');
  await addCustomerPage.assertSelectedCurrency('Rupee');
  
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
});
