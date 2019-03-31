import * as Commands from './commands/commands';
import * as Login from './login/login';
import { Status } from './types';

export class GithubProfileStatus {
  private loginProvider: Login.LoginProvider<any>;

  constructor(options: Login.BasicLoginOptions);
  constructor(options: Login.SessionLoginOptions);
  constructor(private options: any) {
    if (Login.SessionLoginProvider.validateOptions(options)) {
      this.loginProvider = new Login.SessionLoginProvider(options);
    } else if (Login.BasicLoginProvider.validateOptions(options)) {
      this.loginProvider = new Login.BasicLoginProvider(options);
    } else {
      throw new Error('Invalid login options');
    }
  }

  /**
   * Clears the user profile status
   */
  public async clear(): Promise<boolean> {
    return this.execCommand(Commands.ClearCommand);
  }

  /**
   * Gets the user profile status
   */
  public async get(): Promise<Status> {
    return this.execCommand(Commands.GetCommand);
  }

  /**
   * Updates the user profile status
   */
  public async set(status: Partial<Status>): Promise<boolean> {
    return this.execCommand(Commands.SetCommand, status);
  }

  private async execCommand<C extends Commands.CommandClass, P extends Commands.CommandParams<C>>(
    command: C,
    ...args: P
  ) {
    const page = await this.loginProvider.login();
    return new command(page, ...args).exec() as Commands.CommandResult<C>;
  }
}
