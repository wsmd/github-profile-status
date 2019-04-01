// tslint:disable: no-console

import { deepEqual } from 'assert';
import { GitHubProfileStatus } from '../lib';
import { Status } from '../lib/types';

async function test(name: string, expected: any, cb: (...args: any) => any) {
  console.group(name);
  try {
    const result = await cb();
    deepEqual(result, expected);
    console.log('✓', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.groupEnd();
}

const options = {} as any;
if (process.env.USER_SESSION) {
  options.sessionCookie = process.env.USER_SESSION;
} else {
  options.username = process.env.GITHUB_USERNAME;
  options.password = process.env.GITHUB_PASSWORD;
}

const profileStatus = new GitHubProfileStatus(options);

const status = {
  busy: true,
  emoji: ':wave:',
  message: 'Hello, World!',
};

async function main() {
  await test('profileStatus.set', true, () => {
    return profileStatus.set(status as Status);
  });

  await test('profileStatus.get', status, () => {
    return profileStatus.get();
  });

  await test('profileStatus.clear', true, () => {
    return profileStatus.clear();
  });
}

main();
