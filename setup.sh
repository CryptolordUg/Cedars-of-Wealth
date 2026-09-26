#!/bin/bash
set -e

# Cedars of Wealth - VPS One-Click Setup
# Run as root on Ubuntu 22.04: bash setup.sh

echo "=== Installing Docker ==="
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo "=== Cloning Cedars ==="
if [ -d "/opt/cedars" ]; then
  cd /opt/cedars && git pull
else
  git clone https://github.com/CryptolordUg/Cedars-of-Wealth.git /opt/cedars
  cd /opt/cedars
fi

echo "=== Setting up .env ==="
if [ ! -f "api/.env" ]; then
  cp api/.env.example api/.env
  # generate random secret if not set
  SECRET=$(openssl rand -hex 32)
  sed -i "s/change_this_to_64_char_random_string_min_32/$SECRET/g" api/.env
  sed -i "s/change_this_to_64_char_random/$SECRET/g" api/.env || true
  echo "Generated JWT_SECRET"
fi

echo "=== Starting ==="
docker compose up -d --build

echo "=== Waiting 10s ==="
sleep 10
docker ps
curl -s http://localhost:8080/v2/gateway/health || echo "API not yet ready, check docker logs"

echo ""
echo "Done! API should be at http://YOUR_VPS_IP:8080/v2/gateway/health"
