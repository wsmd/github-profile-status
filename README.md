<div align="center">

# github-profile-status

[![Current Release](https://img.shields.io/npm/v/github-profile-status.svg)](https://www.npmjs.com/package/github-profile-status)
[![Licence](https://img.shields.io/github/license/wsmd/github-profile-status.svg)](https://github.com/wsmd/github-profile-status/blob/master/LICENSE)

</div>

## Motivation

Github recently added a cool [new feature](https://github.blog/changelog/2019-01-09-set-your-status/) that allows users to set a status on their Github profile!

> You can now set your status on GitHub! Use your status to share specific information with only your organization, or share a status with all of GitHub! Optionally, you can indicate that you’re busy so your collaborators can determine whether to mention someone else for a quicker response.

<div align="center">

<img src="https://user-images.githubusercontent.com/2100222/55207714-ba68c380-51b1-11e9-9283-d11e4265a827.png" width="482" />
<br />
<br />
</div>

Unfortunately, at the time of writing this, it's not possible to update the profile status via the API.

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
    session: process.env.USER_SESSION, // the user_session cookie
  });

  // update your the github profile status
  const success = await profileStatus.set({
    busy: true,
    emoji: ':+1:',
    message: process.argv[2],
  });

  // get your github profile status
  const status = await profileStatus.get();
}
```

## Licence

MIT
