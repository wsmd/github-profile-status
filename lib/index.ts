import { ElementHandle, Page } from 'puppeteer';
import { Emoji } from './Emoji';
import { BasicLoginOptions, BasicLoginProvider } from './login/BasicLoginProvider';
import { LoginProvider } from './login/LoginProvider';
import { SessionLoginOptions, SessionLoginProvider } from './login/SessionLoginProvider';

interface Status {
  message: string;
  emoji: Emoji;
  busy: boolean;
}

interface StatusFormFields {
  form: ElementHandle<HTMLFormElement>;
  emoji: ElementHandle<HTMLInputElement>;
  message: ElementHandle<HTMLInputElement>;
  busy: ElementHandle<HTMLInputElement>;
}

interface ConstructorOptions {
  debug?: boolean;
}

export class GithubProfileStatus {
  private loginProvider: LoginProvider<any>;

  constructor(options: ConstructorOptions & BasicLoginOptions);
  constructor(options: ConstructorOptions & SessionLoginOptions);
  constructor(private options: any) {
    if (SessionLoginProvider.validateOptions(options)) {
      this.loginProvider = new SessionLoginProvider(options);
    } else if (BasicLoginProvider.validateOptions(options)) {
      this.loginProvider = new BasicLoginProvider(options);
    } else {
      throw new Error('Invalid login options');
    }
  }

  /**
   * Gets the current user profile status
   */
  public async get(): Promise<Status> {
    const homePage = await this.loginProvider.login();
    const { emoji, message, busy } = await this.getFormFields(homePage);
    const [emojiValue, messageValue, busyValue] = await Promise.all([
      this.getPropertyAsJSON(emoji, 'value'),
      this.getPropertyAsJSON(message, 'value'),
      this.getPropertyAsJSON(busy, 'checked'),
    ]);
    await homePage.browser().close();
    return {
      busy: busyValue,
      emoji: emojiValue as Emoji,
      message: messageValue,
    };
  }

  /**
   * Sets the user profile status
   */
  public async set(status: Partial<Status>): Promise<boolean> {
    const homePage = await this.loginProvider.login();
    const fields = await this.getFormFields(homePage);

    if (status.message) {
      await homePage.evaluate(
        (el: HTMLInputElement, emoji) => (el.value = emoji),
        fields.message,
        status.message,
      );
    }

    if (status.emoji) {
      await homePage.evaluate(
        (el: HTMLInputElement, emoji) => (el.value = emoji),
        fields.emoji,
        status.emoji,
      );
    }

    if (status.busy !== undefined) {
      homePage.evaluate(
        (el: HTMLInputElement, isBusy) => {
          el.checked = isBusy;
        },
        fields.busy,
        status.busy,
      );
    }

    await homePage.evaluate((el: HTMLFormElement) => el.submit(), fields.form);

    await homePage.waitForResponse(
      response => response.url().includes('/users/status') && response.status() === 200,
    );

    await homePage.browser().close();

    return true;
  }

  /**
   * Returns references for the element handlers of user profile status fields
   */
  private async getFormFields(page: Page): Promise<StatusFormFields> {
    const form = await page.$('form[action^="/users/status"]');
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

  /**
   * Fetches a single property of an element handle as JSON
   */
  private async getPropertyAsJSON<T extends keyof HTMLInputElement>(
    element: ElementHandle<any>,
    propertyName: T,
  ): Promise<HTMLInputElement[T]> {
    const property = await element.getProperty(propertyName);
    return property.jsonValue();
  }
}
