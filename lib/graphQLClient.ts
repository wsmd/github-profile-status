import { GraphQLClient } from 'graphql-request';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export function createClient(token: string): GraphQLClient {
  return new GraphQLClient(GITHUB_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
}

export { GraphQLClient };
