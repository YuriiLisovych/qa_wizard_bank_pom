import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {

    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerSubmitButtonLocator = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersTabButtonLocator = page.getByRole('button', { name: 'Customers' });
    this.openAccountTabButtonLocator = page.getByRole('button', { name: 'Open Account' });
    this.addCustomersButtonLocator = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButtonLocator = page.getByRole('button', { name: 'Open Account' });
    this.customersButtonLocator = page.getByRole('button', { name: 'Customers' });
    this.bankManagerLoginButtonLocator = page.getByRole('button', { name: 'Bank Manager Login' });

    this.customerNameDropDownLocator = page.locator('#userSelect');
    this.customerCurrencyDropDownLocator = page.locator('#currency');
    this.processButtonLocator = page.getByRole('button', { name: 'Process'});

    this.searchCustomerFieldLocator = page.getByPlaceholder('Search Customer');
    this.countTableLimit = page.locator('table tbody tr');


  }

  // pages

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust',);
  }

  async openLoginPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
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

  async reloadPage(page) {
    await this.page.reload(page);
  }

  // add customer

  async fillUserFirstNameField(string) {
    await this.firstNameField.fill(string);
  }

  async fillUserLastNameField(string) {
    await this.lastNameField.fill(string);
  }

  async fillPostCodeField(value) {
    await this.postCodeField.fill(value);
  }

  async clickAddCustomerButton() {
    await this.addCustomerSubmitButtonLocator.click();
  }

  async clickCustomersTabButton() {
    await this.customersTabButtonLocator.click();
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

  // manager can login

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButtonLocator.click();
  }

  async assertAddCustomerButtonVisible() {
    await expect(this.addCustomersButtonLocator).toBeVisible();
  }

  async assertOpenAccountButtonVisible() {
    await expect(this.openAccountButtonLocator).toBeVisible();
  }

  async assertCustomersButtonVisible() {
    await expect(this.customersButtonLocator).toBeVisible();
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
    await this.openAccountTabButtonLocator.click();
  }

  async clickProcessButton() {
    await this.processButtonLocator.click();
  }

  //manage can search customer by first name

  async fillSearchCustomerField(name) {
    await this.searchCustomerFieldLocator.fill(name);
  }

  async checkCountTableLimit() {
    await expect(this.countTableLimit).toHaveCount(1);
  }

}
