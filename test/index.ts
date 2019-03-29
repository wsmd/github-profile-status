// tslint:disable: no-console

import { GithubProfileStatus } from '../lib';

const profileStatus = new GithubProfileStatus({
  session: process.env.USER_SESSION!,
});

async function main() {
  try {
    const success = await profileStatus.set({
      busy: true,
      emoji: ':wave:',
      message: process.argv[2] || 'Hello, World!',
    });
    if (success) {
      const status = await profileStatus.get();
      console.log(status);
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();
