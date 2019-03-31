import { LoginProvider } from './loginProvider';

const GITHUB_URL = 'https://github.com/';

export interface SessionLoginOptions {
  sessionCookie: string;
}

export class SessionLoginProvider extends LoginProvider<SessionLoginOptions> {
  public static validateOptions(options: any): options is SessionLoginOptions {
    return typeof options.sessionCookie === 'string';
  }

  public async login() {
    const page = await this.getPage();

    await page.setCookie({
      name: 'user_session',
      url: GITHUB_URL,
      value: this.options.sessionCookie,
    });

    await page.goto(GITHUB_URL, { waitUntil: 'domcontentloaded' });

    for (const cookie of await page.cookies()) {
      if (cookie.name === 'logged_in' && cookie.value === 'yes') {
        return page;
      }
    }

    await page.browser().close();

    throw new Error('InvalidSession');
  }
}
