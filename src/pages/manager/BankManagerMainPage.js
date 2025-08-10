import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerButtonLocator = page.getByRole('button', { name: 'Add Customer' });
    this.customersButtonLocator = page.getByRole('button', { name: 'Customers' });
    this.openAccountButtonLocator = page.getByRole('button', { name: 'Open Account' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async assertAddCustomerButtonVisible() {
    await expect(this.addCustomerButtonLocator).toBeVisible();
  }

  async assertOpenAccountButtonVisible() {
    await expect(this.openAccountButtonLocator).toBeVisible();
  }

  async assertCustomersButtonVisible() {
    await expect(this.customersButtonLocator).toBeVisible();
  }
}
