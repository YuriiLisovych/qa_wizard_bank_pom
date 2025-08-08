import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";

let randomFirstName = faker.person.firstName();
let randomLastName = faker.person.lastName();
let randomPostCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open('');
  await addCustomerPage.fillUserFirstNameField(randomFirstName);
  await addCustomerPage.fillUserLastNameField(randomLastName);
  await addCustomerPage.fillPostCodeField(randomPostCode);
  await addCustomerPage.clickAddCustomerButton();

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.clickCustomersTabButton();
  await addCustomerPage.waitForLoading();
  await addCustomerPage.clickDeleteUserButton(randomFirstName, randomLastName, randomPostCode);
  await addCustomerPage.assertCustomerIsDeleted(randomFirstName, randomLastName, randomPostCode);
  await addCustomerPage.reloadPage();
  await addCustomerPage.assertCustomerIsDeleted(randomFirstName, randomLastName, randomPostCode);
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
