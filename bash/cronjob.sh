#!/bin/sh

# 0 * * * * ec2-user cd /home/ec2-user/mtg-toolbox && ./bash/cronjob.sh
# pings version.json runs once per hour, downloads zips if there's an update

git pull

/home/ec2-user/.nvm/versions/node/v8.9.1/bin/node script/scrape.js
/home/ec2-user/.nvm/versions/node/v8.9.1/bin/node script/gen-json.js
