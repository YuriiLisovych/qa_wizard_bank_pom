import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButtonLocator = page.getByRole('button', {
      name: 'Customer Login',
    });
    this.bankManagerLoginButtonLocator = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async openLoginPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButtonLocator.click();
  }

  async clickBankManagerLoginButton() {
    await this.bankManagerLoginButtonLocator.click();
  }
}
