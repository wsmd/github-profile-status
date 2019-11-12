import { UserStatus } from '../types';
import { BaseCommand } from './baseCommand';

const getUserStatusQuery = `
  query ($user: String!) {
    user (login: $user) {
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
  user: {
    status: UserStatus | null;
  };
}

export class GetUserCommand extends BaseCommand<Payload['user']['status']> {
  public async perform(user: string) {
    const userStatusPayload = await this.client.request<Payload>(getUserStatusQuery, {
      user,
    });
    return userStatusPayload.user.status;
  }
}
