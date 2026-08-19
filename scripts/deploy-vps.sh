#!/usr/bin/env bash
# Deploy DuexAi to the Hostinger VPS
#
# From project root:
#   ./scripts/deploy-vps.sh              # pull latest from GitHub (default)
#   DEPLOY_MODE=rsync ./scripts/deploy-vps.sh   # push local files directly
#
# Optional:
#   VPS_HOST=root@93.127.214.43
#   APP_DOMAIN=gybbit.com
#   GITHUB_REPO=https://github.com/bigmoneypr/DuexAi.git
#   GITHUB_BRANCH=main

set -euo pipefail

VPS_HOST="${VPS_HOST:-root@93.127.214.43}"
APP_DOMAIN="${APP_DOMAIN:-gybbit.com}"
APP_DIR="/var/www/wizcoin"
DEPLOY_MODE="${DEPLOY_MODE:-git}"
GITHUB_REPO="${GITHUB_REPO:-git@github.com:bigmoneypr/DuexAi.git}"
GITHUB_BRANCH="${GITHUB_BRANCH:-main}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ ! -f "$ROOT_DIR/.env.production" ]]; then
  echo "Missing .env.production in project root."
  exit 1
fi

echo "==> Testing SSH to $VPS_HOST"
ssh -o BatchMode=yes -o ConnectTimeout=15 "$VPS_HOST" "echo SSH OK"

if [[ "$DEPLOY_MODE" == "git" ]]; then
  echo "==> Pulling $GITHUB_BRANCH from GitHub on VPS"
  ssh "$VPS_HOST" bash -s <<REMOTE
set -euo pipefail
APP_DIR="$APP_DIR"
GITHUB_REPO="$GITHUB_REPO"
GITHUB_BRANCH="$GITHUB_BRANCH"
ENV_BACKUP="/tmp/wizcoin-env.production.bak"

if [[ -f "\$APP_DIR/.env.production" ]]; then
  cp "\$APP_DIR/.env.production" "\$ENV_BACKUP"
fi

if [[ ! -d "\$APP_DIR/.git" ]]; then
  echo "First-time git setup: cloning into \$APP_DIR"
  CLONE_DIR=\$(mktemp -d)
  git clone --branch "\$GITHUB_BRANCH" "\$GITHUB_REPO" "\$CLONE_DIR"
  if [[ -f "\$APP_DIR/.env.production" ]]; then
    cp "\$APP_DIR/.env.production" "\$CLONE_DIR/.env.production"
  elif [[ -f "\$ENV_BACKUP" ]]; then
    cp "\$ENV_BACKUP" "\$CLONE_DIR/.env.production"
  fi
  rm -rf "\$APP_DIR"
  mv "\$CLONE_DIR" "\$APP_DIR"
else
  cd "\$APP_DIR"
  git fetch origin "\$GITHUB_BRANCH"
  git reset --hard "origin/\$GITHUB_BRANCH"
  git clean -fd -e .env.production
fi

if [[ -f "\$ENV_BACKUP" ]]; then
  cp "\$ENV_BACKUP" "\$APP_DIR/.env.production"
fi
REMOTE
else
  echo "==> Rsyncing local files to $APP_DIR"
  ssh "$VPS_HOST" "mkdir -p $APP_DIR"
  rsync -avz --delete \
    --exclude node_modules \
    --exclude .next \
    --exclude .git \
    --exclude '*.purple.bak' \
    --exclude '.env.local' \
    "$ROOT_DIR/" "$VPS_HOST:$APP_DIR/"
fi

echo "==> Uploading .env.production"
scp "$ROOT_DIR/.env.production" "$VPS_HOST:$APP_DIR/.env.production"

echo "==> Building and restarting on VPS"
ssh "$VPS_HOST" bash -s <<REMOTE
set -euo pipefail
cd "$APP_DIR"
rm -f .env.local
set -a
source .env.production
set +a
export NODE_ENV=production
npm install --include=dev
npx prisma generate
npx prisma db push
npm run build
pm2 delete wizcoin 2>/dev/null || true
pm2 start npm --name wizcoin -- start
pm2 save
sleep 2
pm2 status
curl -s -o /dev/null -w "App HTTP: %{http_code}\n" http://127.0.0.1:3000/
REMOTE

echo "==> Configuring Crontab on VPS"
ssh "$VPS_HOST" bash -s << 'CRON_SETUP'
set -euo pipefail
cd /var/www/wizcoin

CRON_SECRET_VAL=$(grep '^CRON_SECRET=' .env.production 2>/dev/null | cut -d '=' -f 2- | sed 's/[" ]//g' || true)
if [ -z "$CRON_SECRET_VAL" ]; then
  CRON_SECRET_VAL=$(openssl rand -hex 16)
  echo "CRON_SECRET=$CRON_SECRET_VAL" >> .env.production
  echo "Generated new CRON_SECRET: $CRON_SECRET_VAL"
fi

CRON_FILE=$(mktemp)
crontab -l 2>/dev/null | grep -v 'gybbit.com/api/cron/runner' > "$CRON_FILE" || true
echo "* * * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=minute\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
echo "*/2 * * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=sweep\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
echo "0 * * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=hourly\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
echo "0 0 * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=daily\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
echo "0 8 * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=morning_quote\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
echo "0 10 * * * curl -s -X GET \"https://gybbit.com/api/cron/runner?job=daily_signal\" -H \"Authorization: Bearer $CRON_SECRET_VAL\" > /dev/null 2>&1" >> "$CRON_FILE"
crontab "$CRON_FILE"
rm "$CRON_FILE"
echo "Crontab configured successfully:"
crontab -l
CRON_SETUP

echo ""
echo "Done. Live at https://$APP_DOMAIN"
echo "Deploy mode: $DEPLOY_MODE ($GITHUB_REPO @ $GITHUB_BRANCH)"
