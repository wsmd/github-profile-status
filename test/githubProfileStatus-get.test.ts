import { GitHubProfileStatus } from '../lib/githubProfileStatus';
import { createClientMock } from './__helpers__/clientMock';

describe('GitHubProfileStatus.get', () => {
  it('sends a query to retrieve the user status', async () => {
    const clientMock = createClientMock();
    const profileStatus = new GitHubProfileStatus(clientMock.client);

    const expectedStatus = { message: 'it works!' };
    clientMock.responseWith({
      viewer: {
        status: expectedStatus,
      },
    });

    const result = await profileStatus.get();

    expect(clientMock.client.request.lastCall).toMatchInlineSnapshot(`
      Array [
        "
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
      ",
      ]
    `);

    expect(result).toEqual(expectedStatus);
  });
});
