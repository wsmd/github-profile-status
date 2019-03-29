import { Browser, Page } from 'puppeteer';

export abstract class LoginProvider {
  public async login(): Promise<Page> {
    throw new Error('Method not implemented');
  }
}
