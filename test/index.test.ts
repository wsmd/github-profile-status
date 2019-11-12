import { GitHubProfileStatus } from '../lib';
import { GitHubProfileStatus as GitHubProfileStatusBase } from '../lib/githubProfileStatus';

describe('GitHubProfileStatus', () => {
  it('creates a instance of GitHubProfileStatusBase', () => {
    const profileStatus = new GitHubProfileStatus({ token: 'abc123' });
    expect(profileStatus).toBeInstanceOf(GitHubProfileStatusBase);
  });
});
