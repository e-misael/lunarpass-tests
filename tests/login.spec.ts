import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { NavigationBar } from '../pages/components/navBar';
import { validUser, invalidUserScenarios } from '../fixtures/users';

let loginPage: LoginPage;
let navBar: NavigationBar;

test.describe('Mission Control page', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        navBar = new NavigationBar(page);
        await loginPage.go();
    });

    test('Should display the Mission Control login page', async () => {
        await loginPage.go();
    });

    test('Should authenticate users in the Mission Control page', async () => {
        await loginPage.login(validUser);
        await expect(navBar.logoutButton()).toBeVisible();
    });

    for (const scenario of invalidUserScenarios) {
        test(`Should not authenticate ${scenario.description}`, async () => {
            await loginPage.login(scenario.user);
            await expect(loginPage.getAlertText()).toHaveText(scenario.message);
            await expect(navBar.logoutButton()).toBeHidden();
        });
    }
});