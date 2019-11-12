export type Command<Params extends any[] = any[]> = new (...args: any[]) => {
  perform(...args: Params): Promise<any>;
};

export type CommandReturnType<C> = C extends new (...args: any[]) => {
  perform(...args: any[]): Promise<infer R>;
}
  ? R
  : never;

export type CommandParams<C> = C extends Command<infer Params> ? Params : never;

export { SetCommand } from './setCommand';
export { GetUserCommand } from './getUserCommand';
export { GetViewerCommand } from './getViewerCommand';
export { ClearCommand } from './clearCommand';
