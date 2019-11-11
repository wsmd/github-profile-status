import * as Commands from './commands';
import { GraphQLClient } from './graphQLClient';
import { ChangeUserStatusInput } from './types';

export class GitHubProfileStatus {
  constructor(private client: GraphQLClient) {}

  /**
   * Clears the user profile status
   */
  public async clear(): Promise<boolean> {
    return this.execCommand(Commands.ClearCommand);
  }

  /**
   * Retrieves the status of the authenticated user
   */
  public async get() {
    return this.execCommand(Commands.GetViewerCommand);
  }

  /**
   * Retrieves the status of the provided user
   */
  public async getForUser(user: string) {
    return this.execCommand(Commands.GetUserCommand, user);
  }

  /**
   * Updates the user profile status
   */
  public async set(status: ChangeUserStatusInput) {
    return this.execCommand(Commands.SetCommand, status);
  }

  /**
   * Partially updates the provided status attribues.
   */
  public async update(changes: ChangeUserStatusInput) {
    const currentStatus = await this.get();
    const newStatus = Object.assign(currentStatus || {}, changes);
    return this.set(newStatus as ChangeUserStatusInput);
  }

  private async execCommand<C extends Commands.Command, P extends Commands.CommandParams<C>>(
    command: C,
    ...args: P
  ): Promise<Commands.CommandReturnType<C>> {
    return new command(this.client).perform(...args);
  }
}
