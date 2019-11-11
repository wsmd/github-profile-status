import { GitHubProfileStatus as GitHubProfileStatusBase } from './githubProfileStatus';
import { createClient } from './graphQLClient';

export class GitHubProfileStatus extends GitHubProfileStatusBase {
  constructor(options: GithubProfileStatusConstructorOptions) {
    super(createClient(options.token));
  }
}

export interface GithubProfileStatusConstructorOptions {
  token: string;
}

export { UserStatus, ChangeUserStatusInput } from './types';
