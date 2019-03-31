import { ElementHandle, Page } from 'puppeteer';

interface StatusFormFields {
  form: ElementHandle<HTMLFormElement>;
  emoji: ElementHandle<HTMLInputElement>;
  message: ElementHandle<HTMLInputElement>;
  busy: ElementHandle<HTMLInputElement>;
}

export abstract class StatusCommand<T> {
  constructor(protected page: Page, ...args: any[]) {}

  public async exec(): Promise<T> {
    const result = await this.perform();
    await this.page.browser().close();
    return result;
  }

  protected async perform(): Promise<T> {
    throw new Error('Method not implemented');
  }

  protected async getStatusFields(): Promise<StatusFormFields> {
    const form = await this.page.$('form[action^="/users/status"]');
    if (!form) {
      throw new Error('Could find status form');
    }

    const [message, emoji, busy] = await Promise.all([
      form.$('input[name="message"]'),
      form.$('input[name="emoji"]'),
      form.$('input[name="limited_availability"]'),
    ]);

    if (!(message && emoji && busy)) {
      throw new Error('Could not find status form inputs');
    }

    return { busy, emoji, form, message };
  }
}
