import { GraphQLClient } from '../graphQLClient';

export abstract class BaseCommand<Payload> {
  constructor(protected client: GraphQLClient) {}

  public perform(...args: any[]): Promise<Payload> {
    throw new Error('Method not implemented');
  }
}
