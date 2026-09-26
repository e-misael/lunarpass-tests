import { Page, Locator, expect } from '@playwright/test';
import { User } from '../fixtures/users';

export class LoginPage { 
    readonly page: Page;
    readonly alert: Locator;

    constructor(page: Page) {
        this.page = page;         
        this.alert = this.page.getByRole('alert');
    }

    async go() {
        await this.page.goto('http://localhost:3000/mission-control/login');

        const title = this.page.getByRole('heading', { name: 'Mission Control' });
        await expect(title).toBeVisible();
    }

    async login (user: User | string, password?: string) {
        const usernameVal = typeof user === 'string' ? user : user.email;
        const passwordVal = typeof user === 'string' ? (password ?? '') : user.password;

        const usernameInput = this.page.getByPlaceholder('Informe seu email');
        const passwordInput = this.page.getByPlaceholder('Sua senha secreta');
        const submitButton = this.page.getByRole('button', { name: 'Entrar' });

        await expect(usernameInput).toBeVisible();
        await usernameInput.fill(usernameVal);
        
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill(passwordVal);
        
        await expect(submitButton).toBeVisible();
        await submitButton.click();
    }

    getAlertText() {
        return this.alert;
    }
}