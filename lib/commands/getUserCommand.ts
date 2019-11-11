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

interface UserStatusPayload {
  user: {
    status: UserStatus;
  };
}

export class GetUserCommand extends BaseCommand<UserStatus> {
  constructor(token: string, private user?: string) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    const variables = { user: this.user };
    const userStatusPayload = await client.request<UserStatusPayload>(
      getUserStatusQuery,
      variables,
    );
    return userStatusPayload.user.status;
  }
}
