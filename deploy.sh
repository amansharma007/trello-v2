#!/usr/bin/env sh
# abort on errors
set -e
# navigate into the build output directory
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:amansharma007/trello-v2.git master:gh-pages
cd -