import {Page, Locator, expect} from '@playwright/test';

export class NavigationBar { 
    readonly page: Page;
    readonly logout: Locator;

    constructor( page: Page) {
        this.page = page;         
        this.logout = this.page.getByRole('button', { name: 'Sair' });
    }

    logoutButton() {
        return this.logout;
    }
}