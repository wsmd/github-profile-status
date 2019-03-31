import { Page } from 'puppeteer';
import { Status } from '../types';
import { StatusCommand } from './statusCommand';

export class SetCommand extends StatusCommand<boolean> {
  constructor(page: Page, private status: Partial<Status>) {
    super(page);
  }

  protected async perform() {
    const fields = await this.getStatusFields();

    if (this.status.message) {
      await this.page.evaluate(
        (el: HTMLInputElement, emoji) => (el.value = emoji),
        fields.message,
        this.status.message,
      );
    }

    if (this.status.emoji) {
      await this.page.evaluate(
        (el: HTMLInputElement, emoji) => (el.value = emoji),
        fields.emoji,
        this.status.emoji,
      );
    }

    if (this.status.busy !== undefined) {
      this.page.evaluate(
        (el: HTMLInputElement, isBusy) => (el.checked = isBusy),
        fields.busy,
        this.status.busy,
      );
    }

    await this.page.evaluate((el: HTMLFormElement) => el.submit(), fields.form);

    await this.page.waitForResponse(
      response => response.url().includes('/users/status') && response.status() === 200,
    );

    return true;
  }
}
