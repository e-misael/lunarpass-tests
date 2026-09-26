import { Page, Locator, expect } from '@playwright/test';

export class CreateMissionPage { 
    readonly page: Page;
    readonly createMissionTitle: Locator;
    readonly createMissionContainer: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.createMissionTitle = this.page.getByRole('heading', { name: 'Programar missão' });
        this.createMissionContainer = this.page.locator('.mission-control-container').first();
    }

    async isFormDisplayed(): Promise<void> {
        await expect(this.createMissionContainer).toBeVisible({timeout: 30000});
    }
};