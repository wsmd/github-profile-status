import { GraphQLClient, UserStatus } from '../types';
import { BaseCommand } from './baseCommand';

const getViewerStatusQuery = `
  query getViewerStatusQuery {
    viewer {
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
  viewer: {
    status: UserStatus | null;
  };
}

export class GetViewerCommand extends BaseCommand<UserStatus | null> {
  constructor(token: string) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    const result = await client.request<Payload>(getViewerStatusQuery);
    return result.viewer.status;
  }
}
