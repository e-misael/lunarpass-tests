import { Page, Locator, expect } from '@playwright/test';
import { Mission } from '../support/interfaces/types';
import { formatDate } from '../support/helpers/date';

export class CreateMissionPage { 
    readonly page: Page;
    readonly createMissionTitle: Locator;
    readonly createMissionContainer: Locator;
    readonly missionIdField: Locator;
    readonly rocketField: Locator;
    readonly lunarBaseField: Locator;
    readonly departureDateField: Locator;
    readonly returnDateField: Locator;
    readonly priceField: Locator;
    readonly alert: Locator;
    readonly validationError: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.createMissionTitle = this.page.getByRole('heading', { name: 'Programar missão' });
        this.createMissionContainer = this.page.locator('.mission-control-container').first();
        this.missionIdField = this.page.getByRole('textbox', { name: 'ID da missão' });
        this.rocketField = this.page.getByRole('textbox', { name: 'Foguete' });
        this.lunarBaseField = this.page.getByLabel('Base lunar');
        this.departureDateField = this.page.getByLabel('Data de partida');
        this.returnDateField = this.page.getByTestId('mission-form-return-date');
        this.priceField = this.page.getByLabel('Preço por passagem (USD)');
        this.alert = this.page.locator('[data-type="success"]');
        this.validationError = this.page.getByRole('alert');
    }

    async isFormDisplayed(): Promise<void> {
        await expect(this.createMissionContainer).toBeVisible({timeout: 30000});
    }

    async fillMissionForm(mission: Mission): Promise<void> {
        await this.missionIdField.fill(mission.id);
        await this.rocketField.fill(mission.rocket);
        await this.lunarBaseField.selectOption(mission.baseId);
        await this.departureDateField.fill(mission.departureDate);
        await (expect(this.returnDateField).toHaveText(formatDate(mission.returnDate)));
        await this.priceField.fill(mission.price.toString());
    }

    async submitMissionForm(): Promise<void> {
        const submitButton = this.page.getByRole('button', { name: 'Salvar missão' });
        await expect(submitButton).toBeVisible();
        await submitButton.click();
    }

    async getAlertText(): Promise<string> {
        return await this.alert.textContent() ?? '';
    }
};