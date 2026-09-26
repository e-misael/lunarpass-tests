import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { CreateMissionPage } from '../pages/createMissionPage';
import { NavigationBar } from '../pages/components/navBar';
import { validUser } from '../fixtures/users';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let createMissionPage: CreateMissionPage;
let navBar: NavigationBar;

test.describe('Mission Control page', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        createMissionPage = new CreateMissionPage(page);
        navBar = new NavigationBar(page);
        
        await loginPage.go();
        await loginPage.login(validUser);
    });

    test('Should open the Create Mission page', async () => {
        await dashboardPage.accessCreateMissionPage();
        await createMissionPage.isFormDisplayed();    
    });
});