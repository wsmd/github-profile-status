import { GitHubProfileStatus } from '../lib/githubProfileStatus';
import { createClientMock } from './__helpers__/clientMock';

describe('GitHubProfileStatus.set', () => {
  it('sends a muation to set the user status', async () => {
    const clientMock = createClientMock();
    const profileStatus = new GitHubProfileStatus(clientMock.client);

    const expectedStatus = {
      emoji: ':wave:',
      limitedAvailability: true,
      message: 'howdy!',
    };

    clientMock.responseWith({
      changeUserStatus: {
        status: expectedStatus,
      },
    });

    const result = await profileStatus.set(expectedStatus as any);

    expect(clientMock.client.request.lastCall).toMatchInlineSnapshot(`
      Array [
        "
        mutation ($status: ChangeUserStatusInput!) {
          changeUserStatus(input: $status) {
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
          "status": Object {
            "emoji": ":wave:",
            "limitedAvailability": true,
            "message": "howdy!",
          },
        },
      ]
    `);

    expect(result).toBe(expectedStatus);
  });
});
