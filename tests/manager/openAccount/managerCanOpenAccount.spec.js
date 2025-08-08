import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

let randomFirstName;
let randomLastName;
let randomPostCode;

test.beforeEach(async ({ page }) => {

  randomFirstName = faker.person.firstName();
  randomLastName = faker.person.lastName();
  randomPostCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  
  await addCustomerPage.open();
  await addCustomerPage.fillUserFirstNameField(randomFirstName);
  await addCustomerPage.fillUserLastNameField(randomLastName);
  await addCustomerPage.fillPostCodeField(randomPostCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  const fullName = `${randomFirstName} ${randomLastName}`

  await addCustomerPage.clickOpenAccountTabButton();
  await addCustomerPage.waitForLoadingAccountPage();
  await addCustomerPage.selectCustomerNameDropDown(fullName);
  await addCustomerPage.selectCurrencyDropDown('Dollar');
  await addCustomerPage.clickProcessButton();
  await addCustomerPage.reloadPage();
  await addCustomerPage.clickCustomersTabButton();
  await addCustomerPage.assertCustomerIsPresent(randomFirstName, randomLastName, randomPostCode);
  await addCustomerPage.assertCustomerAccountNumberHasNumberValue();

  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
