import { GraphQLClient } from '../types';
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
  constructor(token: string) {
    super(token);
  }

  protected async perform(client: GraphQLClient) {
    await client.request(clearUserStatusMutation);
    return true;
  }
}
