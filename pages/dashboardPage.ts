import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage { 
    readonly page: Page;
    readonly createMissionButton: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.createMissionButton = this.page.locator('a[href="/mission-control/new"]');        
    }

    async accessCreateMissionPage(): Promise<void> {
        await expect(this.createMissionButton).toBeVisible({timeout: 30000});
        await this.createMissionButton.click();
    };
}