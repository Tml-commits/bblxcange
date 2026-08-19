#!/usr/bin/env bash
# Run this ON the VPS to deploy the latest GitHub commit:
#   cd /var/www/wizcoin && ./scripts/vps-pull-deploy.sh
#
# Requires .env.production already present in the app directory.

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/wizcoin}"
GITHUB_BRANCH="${GITHUB_BRANCH:-main}"

cd "$APP_DIR"

if [[ ! -d .git ]]; then
  echo "Not a git repo. Run ./scripts/deploy-vps.sh from your machine first."
  exit 1
fi

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production in $APP_DIR"
  exit 1
fi

echo "==> git pull ($GITHUB_BRANCH)"
git fetch origin "$GITHUB_BRANCH"
git reset --hard "origin/$GITHUB_BRANCH"
git clean -fd -e .env.production

rm -f .env.local
set -a
source .env.production
set +a
export NODE_ENV=production

echo "==> install + build"
npm install --include=dev
npx prisma generate
npx prisma db push
npm run build

echo "==> restart pm2"
pm2 delete wizcoin 2>/dev/null || true
pm2 start npm --name wizcoin -- start
pm2 save

echo "Done."
