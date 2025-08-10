import { test } from '@playwright/test';
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

test('Assert manager can choose currencies for account', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const currencies = ['Dollar', 'Pound', 'Rupee'];

  await addCustomerPage.openAccountPage();
  for (const currency of currencies) { 
    await addCustomerPage.selectCurrencyDropDown(currency); 
    await addCustomerPage.assertSelectedCurrency(currency); 
  }
  
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
