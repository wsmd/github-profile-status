import * as Commands from './commands';
import { ChangeUserStatusInput, UserStatus } from './types';

export interface GithubProfileStatusConstructorOptions {
  token: string;
}

export class GitHubProfileStatus {
  private token: string;

  constructor(options: GithubProfileStatusConstructorOptions) {
    this.token = options.token;
  }

  /**
   * Clears the user profile status
   */
  public async clear(): Promise<boolean> {
    return this.execCommand(Commands.ClearCommand);
  }

  /**
   * Retrieves the status of the authenticated user
   */
  public async get(): Promise<UserStatus> {
    return this.execCommand(Commands.GetViewerCommand);
  }

  /**
   * Retrieves the status of the provided user
   */
  public async getForUser(user?: string): Promise<UserStatus> {
    return this.execCommand(Commands.GetUserCommand, user);
  }

  /**
   * Updates the user profile status
   */
  public async set(status: ChangeUserStatusInput): Promise<UserStatus> {
    return this.execCommand(Commands.SetCommand, status);
  }

  private async execCommand<C extends Commands.CommandClass, P extends Commands.CommandParams<C>>(
    command: C,
    ...args: P
  ) {
    return new command(this.token, ...args).exec() as Commands.CommandResult<C>;
  }
}
