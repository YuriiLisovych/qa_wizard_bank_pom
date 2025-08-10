import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {

    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerSubmitButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  
    this.customerNameDropDownLocator = page.locator('#userSelect');
    this.customerCurrencyDropDownLocator = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process'});

    this.searchCustomerField = page.getByPlaceholder('Search Customer');
    this.countCustomerTableRows = page.locator('table tbody tr');


  }

  // pages

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust',);
  }

  async openAccountPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async waitForLoadingAccountPage() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount')
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reloadPage() {
    await this.page.reload();
  }

  // add customer

  async fillUserFirstNameField(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillUserLastNameField(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostCodeField(postCode) {
    await this.postCodeField.fill(postCode);
  }

  async clickAddCustomerSubmitButton() {
    await this.addCustomerSubmitButton.click();
  }

  async clickCustomersTabButton() {
    await this.customersButton.click();
  }

  async assertCustomerIsPresent(randomFirstName, randomLastName, randomPostCode) {
    const rowWithUserLocator = this.page.locator('table tbody tr', {
      hasText: randomFirstName
    }).filter({
      hasText: randomLastName
    }).filter({
      hasText: randomPostCode
    });

    await expect(rowWithUserLocator).toBeVisible();
  }

  async assertCustomerAccountNumberIsEmpty(randomFirstName, randomLastName, randomPostCode) {
    const rowWithUserLocator = this.page.locator('table tbody tr', {
      hasText: randomFirstName
    }).filter({
      hasText: randomLastName
    }).filter({
      hasText: randomPostCode
    });

    const accountNumberCell = rowWithUserLocator.locator('td').nth(3);

    await expect(accountNumberCell).toHaveText('');
  }

  async assertCustomerAccountNumberHasNumberValue(randomFirstName, randomLastName, randomPostCode) {
    const rowWithUserLocator = this.page.locator('table tbody tr', {
      hasText: randomFirstName
    }).filter({
      hasText: randomLastName
    }).filter({
      hasText: randomPostCode
    });

    const accountNumberCell = rowWithUserLocator.locator('td').nth(3);

    await expect(accountNumberCell).not.toHaveText('');
  }

  // manager can delete customer

  async clickDeleteUserButton(randomFirstName, randomLastName, randomPostCode) {
    const rowWithUserLocator = this.page.locator('table tbody tr', {
      hasText: randomFirstName
    }).filter({
      hasText: randomLastName
    }).filter({
      hasText: randomPostCode
    });

    const clickDeleteButtonLocator = rowWithUserLocator.getByRole('button', { name: 'Delete'});

    await clickDeleteButtonLocator.click();
  }

  async assertCustomerIsDeleted(randomFirstName, randomLastName, randomPostCode) {
    const rowWithUserLocator = this.page.locator('table tbody tr', {
      hasText: randomFirstName
    }).filter({
      hasText: randomLastName
    }).filter({
      hasText: randomPostCode
    });

    await expect(rowWithUserLocator).toBeHidden();
  }

  //manager can choose currencies 

  async selectCustomerNameDropDown(name) {
    await this.customerNameDropDownLocator.selectOption(name);
  }

  async selectCurrencyDropDown(currency) {
    await this.customerCurrencyDropDownLocator.selectOption(currency);
  }

  async assertSelectedCurrency(currency) {
    await expect(this.customerCurrencyDropDownLocator).toHaveValue(currency);
  }

  // manager can open accounts

  async clickOpenAccountTabButton() {
    await this.openAccountButton.click();
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  //manage can search customer by first name

  async fillSearchCustomerField(name) {
    await this.searchCustomerField.fill(name);
  }

  async checkCountTableLimit(expectedCount) {
    await expect(this.countCustomerTableRows).toHaveCount(expectedCount);
  }

}
