import { GraphQLClient } from '../../lib/graphQLClient';

interface WithLastCall {
  lastCall(): any[];
}

function withLastCall(method: jest.Mock) {
  Object.defineProperty(method, 'lastCall', {
    get() {
      const { calls } = method.mock;
      return calls[calls.length - 1];
    },
  });
  return method as jest.Mock & WithLastCall;
}

// This mock is only intended to test against the same GraphQL client interface
// the commands are expected. It's not meant test acutal HTTP calls.

export function createClientMock() {
  const requestMock = jest.fn();

  const client = {
    request: withLastCall(requestMock),
  };

  const mock = {
    client: (client as unknown) as GraphQLClient & typeof client,
    responseWith(response: any) {
      client.request.mockResolvedValueOnce(response);
      return mock;
    },
  };

  return mock;
}
