import { BaseCommand } from './baseCommand';

const clearUserStatusMutation = `
  mutation {
    changeUserStatus(input: {}) {
      status {
        message
      }
    }
  }
`;

export class ClearCommand extends BaseCommand<boolean> {
  public async perform() {
    await this.client.request(clearUserStatusMutation);
    return true;
  }
}
