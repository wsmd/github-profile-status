<div align="center">

# github-profile-status

[![Current Release](https://img.shields.io/npm/v/github-profile-status.svg)](https://www.npmjs.com/package/github-profile-status)
[![Licence](https://img.shields.io/github/license/wsmd/github-profile-status.svg)](https://github.com/wsmd/github-profile-status/blob/master/LICENSE)

</div>

<details>
<summary>📖 Table of Contents</summary>
<p>

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Constructor](#constructor)
    - [`new GithubProfileStatus(options: ConstructorOptions)`](#new-githubprofilestatusoptions-constructoroptions)
    - [Constructor Options](#constructor-options)
  - [Methods](#methods)
    - [`GithubProfileStatus.get(): Promise<Status>`](#githubprofilestatusget-promisestatus)
    - [`GithubProfileStatus.set(status: Status): Promise<boolean>`](#githubprofilestatussetstatus-status-promiseboolean)
  - [Status Object](#status-object)
- [Authentication & Security Disclaimer](#authentication--security-disclaimer)
- [Licence](#licence)

</p>
</details>

## Motivation

Github recently added a cool [new feature](https://github.blog/changelog/2019-01-09-set-your-status/) that allows users to set a status on their Github profile!

> You can now set your status on GitHub! Use your status to share specific information with only your organization, or share a status with all of GitHub! Optionally, you can indicate that you’re busy so your collaborators can determine whether to mention someone else for a quicker response.

<div align="center">

<img src="https://user-images.githubusercontent.com/2100222/55207714-ba68c380-51b1-11e9-9283-d11e4265a827.png" width="482" />
<br />
<br />
</div>

Unfortunately, at the time of writing this, this feature is only available via the Github web interface, and it is not possible to update the profile status via the API.

Therefore, I built this tool to set the status of my Github profile programmatically.

## Installation

```
npm install --save github-profile-status
```

## Usage

```js
import { GithubProfileStatus } from 'github-profile-status';

async function main() {
  const profileStatus = new GithubProfileStatus({
    // login using a user_session cookie
    userSession: process.env.USER_SESSION,
    // or by using username/password
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD,
  });

  // update your the github profile status
  const success = await profileStatus.set({
    busy: true,
    emoji: ':wave:',
    message: 'Hello, world!',
  });

  // get your github profile status
  const status = await profileStatus.get();
}
```

## API

### Constructor

#### `new GithubProfileStatus(options: ConstructorOptions)`

Creates a new github profile status object using the [provided options](#constructor-options).

#### Constructor Options

- `userSession: string`: The `user_session` cookie of an active login session of the GitHub user account. This can be obtained using the [browser's developer tools](https://developers.google.com/web/tools/chrome-devtools/storage/cookies).
- `username: string`: The username of the GitHub user account.
- `password: string`: The password of the GitHub user account.

Please note that if the `userSession` option is provided, it will be used as the default authentication, ignoring both `username` and `password`.

### Methods

The GitHub profile status instance has the following methods:

#### `GithubProfileStatus.get(): Promise<Status>`

Retrieves the user profile status. Returns a Promise that resolves with the [status object](#status-object).

#### `GithubProfileStatus.set(status: Status): Promise<boolean>`

Updates the user profile status using the provided [status parameters](#status-object). All parameters are optional. If you omit certain parameters, they will remain as they are.

### Status Object

The status object has the following keys:

- `busy: boolean`: A boolean indicating whether the profile status should be displayed as "Busy."
- `message: string`: The status message.
- `emoji: string`: The emoji alias that will be displayed on the status. The emoji alias should be provided in this format `:emoji_name:`. The list of all possible emojis is [available here](https://github.com/wsmd/github-profile-status/blob/master/lib/Emoji.d.ts).

## Authentication & Security Disclaimer

I built this tool for my own personal use. Since the functionality is not provided by the Github API, this tool **does not use any of GitHub's official authentication methods**.

This tool requires either the `user_session` cookie from an active login session of the user account or the user basic login information: username and password. This tool will use this information to connect to the user account via `https://github.com` and perform a status update/check. **I highly encourage providing this information using environment variables**.

While this tool **does not persist or share** any information provided, it is very important that you are aware of the limitation. Please use at your own risk.

## Licence

MIT
