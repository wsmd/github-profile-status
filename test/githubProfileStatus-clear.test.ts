import { GitHubProfileStatus } from '../lib/githubProfileStatus';
import { createClientMock } from './__helpers__/clientMock';

describe('GitHubProfileStatus.clear', () => {
  it('sends a mutation to clear the user status', async () => {
    const clientMock = createClientMock();
    const profileStatus = new GitHubProfileStatus(clientMock.client);

    clientMock.responseWith({
      changeUserStatus: {
        status: null,
      },
    });

    const result = await profileStatus.clear();

    expect(clientMock.client.request.lastCall).toMatchInlineSnapshot(`
      Array [
        "
        mutation {
          changeUserStatus(input: {}) {
            status {
              message
            }
          }
        }
      ",
      ]
    `);

    expect(result).toBe(true);
  });
});
