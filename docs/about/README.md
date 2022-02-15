---
title: 关于我
author: 陈科衡
sidebar: false
---

- student
- front-end developer
- hexo-theme-delicate

*My social account:*

- Github: [can-dy-jack](https://github.com/can-dy-jack)
- CSDN: [Kart jim](https://blog.csdn.net/qq_46590483?spm=1001.2100.3001.5343)

*My eamil:* 📫

- jjack_chen3@163.com
- kartjim@163.com

![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=can-dy-jack&repo=hexo-theme-delicate&theme=vue)

|More|
|---|
|🔭 I’m currently working on shou university|
|🌱 I’m currently learning vue...|
|🤔 I’m looking for help with Website development|
|💬 Ask me about ...|
|👯 I’m looking to collaborate on ...|
|😄 Pronouns: ...|
|⚡ Fun fact: ...|
|👍Dynamically generated stats for [github readmes：](https://github.com/anuraghazra/github-readme-stats)|

:::: code-group
::: code-group-item bash

```bash
# run server
npm run server
# build file
npm run build
```

:::
::: code-group-item workflow

```yml
# github action - workflows
name: docs
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '14'
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile
      - name: Build VuePress site
        run: yarn docs:build
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          target_branch: gh-pages
          build_dir: docs/.vuepress/dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

:::
::::

