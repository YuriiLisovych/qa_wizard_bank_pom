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

  getCustomerRow(firstName, lastName, postCode) {
    return this.page
      .locator('table tbody tr', { hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postCode });
  }

  // pages

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
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
    this.page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Customer added successfully');
      dialog.accept();
    });
    await this.addCustomerSubmitButton.click();
  }

  async clickCustomersTabButton() {
    await this.customersButton.click();
  }

  async assertCustomerAccountNumberIsEmpty(firstName, lastName, postCode) {
    const row = this.getCustomerRow(firstName, lastName, postCode);
    const accountNumberCell = row.locator('td').nth(3);
    await expect(accountNumberCell).toHaveText('');
  }

  async assertCustomerAccountNumberHasNumberValue(firstName, lastName, postCode) {
    const row = this.getCustomerRow(firstName, lastName, postCode);
    const accountNumberCell = row.locator('td').nth(3);
    await expect(accountNumberCell).not.toHaveText('');
  }

  // manager can delete customer

  async assertCustomerIsDeleted(firstName, lastName, postCode) {
    const row = this.getCustomerRow(firstName, lastName, postCode);
    await expect(row).toHaveCount(0); // або toBeHidden() якщо row існує як локатор
  }

  async clickDeleteUserButton(firstName, lastName, postCode) {
    const row = this.getCustomerRow(firstName, lastName, postCode);
    const deleteButton = row.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }


  async assertCustomerIsPresent(firstName, lastName, postCode) {
    const row = this.getCustomerRow(firstName, lastName, postCode);
    await expect(row).toBeVisible();
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
    this.page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Account created successfully with account Number');
      dialog.accept();
    });
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
