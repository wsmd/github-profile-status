import { GraphQLClient } from 'graphql-request';

export abstract class BaseCommand<Payload> {
  private client: GraphQLClient;

  constructor(protected token: string, ...args: any[]) {
    this.client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        Authorization: `bearer ${this.token}`,
      },
    });
  }

  public exec(): Promise<Payload> {
    return this.perform(this.client);
  }

  protected async perform(client: GraphQLClient): Promise<Payload> {
    throw new Error('Method not implemented');
  }
}
