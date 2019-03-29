import puppeteer from 'puppeteer';
import { LoginProvider } from './LoginProvider';

const GITHUB_URL = 'https://github.com/';

export class SessionLoginProvider implements LoginProvider {
  constructor(private userSession: string) {}

  public async login() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', req => {
      if (
        req.resourceType() === 'stylesheet' ||
        req.resourceType() === 'font' ||
        req.resourceType() === 'script' ||
        req.resourceType() === 'image'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.setCookie({
      name: 'user_session',
      url: GITHUB_URL,
      value: this.userSession,
    });

    await page.goto(GITHUB_URL, { waitUntil: 'domcontentloaded' });

    for (const cookie of await page.cookies()) {
      if (cookie.name === 'logged_in' && cookie.value === 'yes') {
        return page;
      }
    }

    await browser.close();

    throw new Error('InvalidSession');
  }
}
