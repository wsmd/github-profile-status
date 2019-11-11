import { ChangeUserStatusInput, GraphQLClient, UserStatus } from '../types';
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
    status: UserStatus;
  };
}

export class SetCommand extends BaseCommand<UserStatus> {
  constructor(token: string, private status: ChangeUserStatusInput) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    const result = await client.request<Payload>(changeUserStatusMutation, {
      status: this.status,
    });
    return result.changeUserStatus.status;
  }
}
