import { Page } from 'puppeteer';

export { SetCommand } from './setCommand';
export { GetCommand } from './getCommand';
export { ClearCommand } from './clearCommand';

export type CommandClass<A extends any[] = any[]> = new (page: Page, ...params: A) => {
  exec(): Promise<any>;
};

export type CommandResult<C> = C extends new (...args: any[]) => { exec(): Promise<infer R> }
  ? R
  : never;

export type CommandParams<C> = C extends CommandClass<infer P> ? P : never;
