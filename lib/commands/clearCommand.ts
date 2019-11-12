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

interface Payload {
  changeUserStatus: {
    status: null;
  };
}

export class ClearCommand extends BaseCommand<boolean> {
  public async perform() {
    const result = await this.client.request<Payload>(clearUserStatusMutation);
    return result.changeUserStatus.status === null;
  }
}
