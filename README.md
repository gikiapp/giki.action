# giki.action

**giki.action** is a GitHub action to publish the commit message of `git push` to your Giki personal site, maybe we can call it **Git as a Giki Client**

## Usage

### Start with forking [gikiapp/status.giki.app](https://github.com/status.giki.app)

Giki project team uses this action to publish each status update of Giki project to [status.giki.app](https://status.giki.app), so the most easiest way to start using this action is just fork the [gikiapp/status.giki.app](https://github.com/gikiapp/status.giki.app) project then update the Giki token into your repo's secret, then you can just commit a message without any file changes like this,
```
git commit --allow-empty -m 'This is my first post from giki.action'
git push
```

After the actions run finish, you can check if your website have it.

### Add giki.action to a existing project

It's very easy,

1. Add giki.action to your GitHub action workflow, and configure the Giki token in repo's secret.

```yml
name: CI

on:
  push:
    branches: [ master ]

jobs:
  giki.action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: publish
        uses: gikiapp/giki.action@v1.0.0
        with:
          token: ${{secrets.GIKI_TOKEN}}
```

2. Configure the Giki token into repo's secret.

Done.
