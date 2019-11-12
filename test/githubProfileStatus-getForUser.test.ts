import { GitHubProfileStatus } from '../lib/githubProfileStatus';
import { createClientMock } from './__helpers__/clientMock';

describe('GitHubProfileStatus.getForUser', () => {
  it('sends a query to retrieve a user status', async () => {
    const clientMock = createClientMock();
    const profileStatus = new GitHubProfileStatus(clientMock.client);

    const expectedStatus = { message: 'it works!' };
    clientMock.responseWith({
      user: {
        status: expectedStatus,
      },
    });

    const result = await profileStatus.getForUser('wsmd');

    expect(clientMock.client.request.lastCall).toMatchInlineSnapshot(`
      Array [
        "
        query ($user: String!) {
          user (login: $user) {
            status {
              emoji
              expiresAt
              limitedAvailability: indicatesLimitedAvailability
              message
            }
          }
        }
      ",
        Object {
          "user": "wsmd",
        },
      ]
    `);

    expect(result).toEqual(expectedStatus);
  });
});
