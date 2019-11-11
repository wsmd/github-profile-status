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

interface ViewerStatusPayload {
  viewer: {
    status: UserStatus;
  };
}

export class GetViewerCommand extends BaseCommand<UserStatus> {
  constructor(token: string) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    const result = await client.request<ViewerStatusPayload>(getViewerStatusQuery);
    return result.viewer.status;
  }
}
