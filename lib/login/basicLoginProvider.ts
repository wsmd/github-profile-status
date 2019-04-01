import { Page } from 'puppeteer';
import { LoginProvider } from './loginProvider';

export interface BasicLoginOptions {
  username: string;
  password: string;
}

export class BasicLoginProvider extends LoginProvider<BasicLoginOptions> {
  public static validateOptions(options: any): options is BasicLoginOptions {
    return typeof options.username === 'string' && typeof options.password === 'string';
  }

  public async login() {
    const page = await this.getPage();

    await page.goto('https://github.com/login', { waitUntil: 'domcontentloaded' });

    await page.type('input[name="login"]', this.options.username);
    await page.type('input[name="password"]', this.options.password);
    await page.$eval('form[action^="/session"]', form => (form as HTMLFormElement).submit());

    await page.waitForNavigation();
    return page;
  }
}
