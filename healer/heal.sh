#!/bin/sh
MODE=$1
echo "[$(date)] Heal start mode=$MODE"
pg_isready -h postgres || echo "postgres down"
for c in $(docker ps --filter health=unhealthy --format "{{.ID}}" 2>/dev/null); do
  docker restart $c
  echo "Restarted unhealthy $c"
done
curl -f http://api:8000/risk/health || echo "api risk check failed"
curl -f http://api:8000/market/health || echo "api market check failed"
echo "[$(date)] Heal complete"
