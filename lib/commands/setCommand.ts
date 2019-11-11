import { ChangeUserStatusInput, UserStatus } from '../types';
import { BaseCommand } from './baseCommand';

const changeUserStatusMutation = `
  mutation ($status: ChangeUserStatusInput!) {
    changeUserStatus(input: $status) {
      status {
        emoji
        expiresAt
        limitedAvailability: indicatesLimitedAvailability
        message
      }
    }
  }
`;

interface Payload {
  changeUserStatus: {
    status: UserStatus | null;
  };
}

export class SetCommand extends BaseCommand<Payload['changeUserStatus']['status']> {
  public async perform(status: ChangeUserStatusInput) {
    const result = await this.client.request<Payload>(changeUserStatusMutation, {
      status,
    });
    return result.changeUserStatus.status;
  }
}
