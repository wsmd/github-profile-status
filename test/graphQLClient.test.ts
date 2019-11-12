import fetchMock from 'fetch-mock';
import { createClient, GraphQLClient } from '../lib/graphQLClient';

describe('createClient', () => {
  it('returns an instance of GraphQLClient', () => {
    const client = createClient('1234');
    expect(client).toBeInstanceOf(GraphQLClient);
  });

  it('makes requests with the proper headers', async () => {
    fetchMock.mock({
      matcher: '*',
      response: {
        body: JSON.stringify({ data: {} }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    const client = createClient('1234');
    await client.request('{ query }');

    expect(fetchMock.lastUrl()).toBe('https://api.github.com/graphql');
    expect(fetchMock.lastOptions()).toMatchInlineSnapshot(`
      Object {
        "body": "{\\"query\\":\\"{ query }\\"}",
        "headers": Object {
          "Authorization": "bearer 1234",
          "Content-Type": "application/json",
        },
        "method": "POST",
      }
    `);
  });

  fetchMock.restore();
});
