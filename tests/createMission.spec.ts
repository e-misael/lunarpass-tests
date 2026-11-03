import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { LoginPage } from '../pages/loginPage';
import { CreateMissionPage } from '../pages/createMissionPage';
import { NavigationBar } from '../pages/components/navBar';
import { DashboardPage } from '../pages/dashboardPage';
import { validUser } from '../fixtures/users';
import { Mission } from '../support/interfaces/types';
import { cleanAndInsertMission, cleanMission } from '../support/database/db';

let loginPage: LoginPage;
let createMissionPage: CreateMissionPage;
let navBar: NavigationBar;
let dashboardPage: DashboardPage;
let mission: Mission;
let randomNumber: number;

test.describe('Mission Control page', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createMissionPage = new CreateMissionPage(page);
        navBar = new NavigationBar(page);
        dashboardPage = new DashboardPage(page);
        randomNumber = faker.number.int({ min: 1000, max: 9999 });

        mission = {
            id: `LP-${randomNumber}`,
            rocket: `Falcon ${randomNumber}`,
            baseId: 'orion',
            departureDate: '2027-11-12',
            returnDate: '2027-11-19',
            price: faker.number.int({ min: 1000, max: 9999 })
        }

        await loginPage.go();
        await loginPage.login(validUser);
    });

    test('Should add a new mission', async () => {
        // Arrange
        await dashboardPage.accessCreateMissionPage();
        
        // Act
        await createMissionPage.fillMissionForm(mission);
        await createMissionPage.submitMissionForm();
        
        // Assert
        expect(await createMissionPage.getAlertText()).toContain('A nova missão foi adicionada ao catálogo e já está disponível para reservas.');
        await cleanMission (mission);
    })

    test('Should not add duplicate missions', async () => {
        // Arrange
        await cleanAndInsertMission (mission);
        await dashboardPage.accessCreateMissionPage();
        
        // Act
        await createMissionPage.fillMissionForm(mission);
        await createMissionPage.submitMissionForm();

        // Assert
        expect(await createMissionPage.validationError.textContent()).toContain('Já existe uma missão com este ID.');
        await cleanMission (mission);
    })
})