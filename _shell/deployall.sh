#!/usr/bin/env sh

set -e
#统一使用SSH
# 1. 推送源码到 master 分支
git init
git add .
git commit -m "deploy: source to master"
git remote rm origin 2>/dev/null
git remote add origin git@github.com:20000428/bloghope.git
git push -f origin master

# 2. 构建静态文件
pnpm run build

# 3. 进入 dist 目录并推送到 gh-pages 分支
cd dist
git init
git add -A
git commit -m "deploy: static to gh-pages"
git remote rm origin 2>/dev/null
git remote add origin git@github.com:20000428/bloghope.git
git push -f origin master:gh-pages

cd - 