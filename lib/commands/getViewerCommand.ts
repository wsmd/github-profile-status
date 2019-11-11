import { UserStatus } from '../types';
import { BaseCommand } from './baseCommand';

const getViewerStatusQuery = `
  query {
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

export class GetViewerCommand extends BaseCommand<Payload['viewer']['status']> {
  public async perform() {
    const result = await this.client.request<Payload>(getViewerStatusQuery);
    return result.viewer.status;
  }
}
