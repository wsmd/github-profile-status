import { GitHubProfileStatus } from '../lib/githubProfileStatus';
import { createClientMock } from './__helpers__/clientMock';

describe('GitHubProfileStatus.update', () => {
  it('sends a mutation to update the user status', async () => {
    const clientMock = createClientMock();
    const profileStatus = new GitHubProfileStatus(clientMock.client);

    clientMock.responseWith({
      viewer: {
        // current status
        status: {
          emoji: ':wave:',
          limitedAvailability: true,
          message: 'old status!',
        },
      },
    });

    const updatePromise = profileStatus.update({
      expiresAt: '2019-11-12T01:41:11.518Z',
      message: 'new status!',
    });

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

    const NEW_STATUS_FROM_SERVER = Symbol();

    clientMock.responseWith({
      changeUserStatus: {
        status: NEW_STATUS_FROM_SERVER,
      },
    });

    await new Promise(process.nextTick);

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
            "expiresAt": "2019-11-12T01:41:11.518Z",
            "limitedAvailability": true,
            "message": "new status!",
          },
        },
      ]
    `);

    expect(updatePromise).resolves.toBe(NEW_STATUS_FROM_SERVER);
  });
});
