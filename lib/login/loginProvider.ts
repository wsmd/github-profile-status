import puppeteer from 'puppeteer';

export abstract class LoginProvider<T> {
  public static validateOptions(options: any): boolean {
    throw new Error('Method no implemented');
  }

  constructor(protected options: T) {}

  public async login(): Promise<puppeteer.Page> {
    throw new Error('Method not implemented');
  }

  protected async getPage(): Promise<puppeteer.Page> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'document') {
        request.continue();
      } else if (request.resourceType() === 'script' && request.url().includes('frameworks')) {
        request.continue();
      } else {
        request.abort();
      }
    });

    return page;
  }
}
