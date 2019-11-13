<div align="center">

# github-profile-status <!-- omit in toc -->

[![Current Release](https://img.shields.io/npm/v/github-profile-status.svg)](https://www.npmjs.com/package/github-profile-status)
[![CI Build](https://travis-ci.org/wsmd/github-profile-status.svg?branch=master)](https://travis-ci.org/wsmd/github-profile-status)
[![Coverage Status](https://coveralls.io/repos/github/wsmd/github-profile-status/badge.svg?branch=master)](https://coveralls.io/github/wsmd/github-profile-status?branch=master)
[![Licence](https://img.shields.io/github/license/wsmd/github-profile-status.svg)](https://github.com/wsmd/github-profile-status/blob/master/LICENSE)

</div>

<details>
<summary>📖 Table of Contents</summary>
<p>

- [Motivation](#motivation)
- [Installation](#installation)
- [Example](#example)
- [API](#api)
  - [Constructor](#constructor)
    - [`new GitHubProfileStatus(options: ConstructorOptions)`](#new-githubprofilestatusoptions-constructoroptions)
    - [Constructor Options](#constructor-options)
  - [Methods](#methods)
    - [`get(): Promise<UserStatus | null>`](#get-promiseuserstatus--null)
    - [`getForUser(username?: string): Promise<UserStatus | null>`](#getforuserusername-string-promiseuserstatus--null)
    - [`set(status: ChangeUserStatusInput): Promise<UserStatus | null>`](#setstatus-changeuserstatusinput-promiseuserstatus--null)
    - [`update(status: ChangeUserStatusInput): Promise<UserStatus | null>`](#updatestatus-changeuserstatusinput-promiseuserstatus--null)
    - [`clear(): Promise<boolean>`](#clear-promiseboolean)
  - [`ChangeUserStatusInput`](#changeuserstatusinput)
  - [`UserStatus`](#userstatus)
- [Licence](#licence)

</p>
</details>

## Motivation

GitHub introduced a [new feature](https://github.blog/changelog/2019-01-09-set-your-status/) that allows you to set your status on your profile!

<div align="center">
<img src="https://user-images.githubusercontent.com/2100222/55207714-ba68c380-51b1-11e9-9283-d11e4265a827.png" width="482" />
<br />
<br />
</div>

This library gives you the ability to programmatically update your GitHub profile status. With this, you can do really interesting stuff, like [displaying what you're listening to](https://github.com/wsmd/github-now-playing) right on GitHub! The possibilities are endless!

## Installation

This library is available on the [npm](https://www.npmjs.com/package/github-profile-status) registry as a [node](https://nodejs.org/en/) module and can be installed by running:

```sh
# via npm
npm install --save github-profile-status

# via yarn
yarn add github-profile-status
```

## Example

```js
import { GitHubProfileStatus } from 'github-profile-status';

async function main() {
  const profileStatus = new GitHubProfileStatus({
    token: process.env.GITHUB_ACCESS_TOKEN,
  });

  // set your the github profile status
  await profileStatus.set({
    emoji: ':wave:',
    message: 'Hello, world!',
    limitedAvailability: true,
  });

  // update your the github profile status
  await profileStatus.update({
    message: 'Howdy!',
  });

  // get your github profile status
  const status = await profileStatus.get();

  // clears your github profile status
  const success = await profileStatus.clear();
}
```

## API

### Constructor

#### `new GitHubProfileStatus(options: ConstructorOptions)`

Creates a new github profile status instance.

#### Constructor Options

An object with the following keys:

- `token: string`: a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with the **user** scope.

### Methods

Instances have the following methods:

#### `get(): Promise<UserStatus | null>`

Retrieves the status of the authenticated user.

Returns a Promise that resolves with the [user status](#userstatus) object, or `null` if the user does not have a status set.

#### `getForUser(username?: string): Promise<UserStatus | null>`

Retrieves the status of the provided user.

Returns a Promise that resolves with the [user status](#userstatus) object, or `null` if the user does not have a status set.

#### `set(status: ChangeUserStatusInput): Promise<UserStatus | null>`

Sets the user status using the provided [`status`](#changeuserstatusinput).

Note that attributes omitted from `status` will be cleared. If you only want to update the specified attributes without affecting any existing ones, consider using the [`update()`](#updatestatus-changeuserstatusinput-promiseuserstatus--null) method instead.

Returns a Promise that resolves with the [user status](#userstatus) object, or `null` if the status was cleared (e.g. providing an empty message).

#### `update(status: ChangeUserStatusInput): Promise<UserStatus | null>`

Partially updates the status with the provided attributes. All attributes of [`status`](#changeuserstatusinput) are optional. Attributes omitted from the `status` object will remain as they are.

Returns a Promise that resolves with the [user status](#userstatus) object, or `null` if the status was cleared (e.g. providing empty attributes).

#### `clear(): Promise<boolean>`

Clears the user profile status.

Returns a Promise that resolves to a boolean indicating a successful operation.

### `ChangeUserStatusInput`

```ts
interface ChangeUserStatusInput {
  /**
   * The emoji to represent your status. Can either be a native Unicode emoji or
   * an emoji name with colons, e.g., :wave:
   */
  emoji?: string | null;
  /**
   * If set, the user status will not be shown after this date. The value can be
   * either a Date object or an ISO-8601 encoded UTC date string.
   */
  expiresAt?: Date | string | null;
  /**
   * Whether this status should indicate you are not fully available on GitHub,
   * e.g., you are away.
   */
  limitedAvailability?: boolean;
  /**
   * A short description of your current status.
   */
  message?: string | null;
}
```

### `UserStatus`

The status object has the following keys:

```ts
interface UserStatus {
  /**
   * An emoji summarizing the user's status.
   */
  emoji: string | null;
  /**
   * If set, the status will not be shown after this date.
   */
  expiresAt: string | null;
  /**
   * Whether this status indicates the user is not fully available on GitHub.
   */
  limitedAvailability: boolean;
  /**
   * A brief message describing what the user is doing.
   */
  message: string | null;
}
```

## Licence

MIT
