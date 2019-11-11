export { SetCommand } from './setCommand';
export { GetUserCommand } from './getUserCommand';
export { GetViewerCommand } from './getViewerCommand';
export { ClearCommand } from './clearCommand';

export type CommandClass<A extends any[] = any[]> = new (token: string, ...params: A) => {
  exec(): Promise<any>;
};

export type CommandResult<C> = C extends new (...args: any[]) => {
  exec(): Promise<infer R>;
}
  ? R
  : never;

export type CommandParams<C> = C extends CommandClass<infer P> ? P : never;
