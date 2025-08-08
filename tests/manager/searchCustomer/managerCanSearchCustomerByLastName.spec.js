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
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can search customer by Last Name', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.clickCustomersTabButton();
  await addCustomerPage.fillSearchCustomerField(randomLastName);
  await addCustomerPage.assertCustomerIsPresent(randomLastName);
  await addCustomerPage.checkCountTableLimit();
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
