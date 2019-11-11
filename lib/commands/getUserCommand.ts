import { GraphQLClient, UserStatus } from '../types';
import { BaseCommand } from './baseCommand';

const getUserStatusQuery = `
  query getUserStatusQuery($user: String!) {
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

export class GetUserCommand extends BaseCommand<UserStatus | null> {
  constructor(token: string, private user?: string) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    const userStatusPayload = await client.request<Payload>(getUserStatusQuery, {
      user: this.user,
    });
    return userStatusPayload.user.status;
  }
}
