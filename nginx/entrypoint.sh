#!/bin/sh
set -e

# ${BACKEND_URL} だけを置換する
# （nginx の $host, $remote_addr 等の変数は置換しない）
envsubst '${BACKEND_URL}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

echo ">>> [nginx] BACKEND_URL = ${BACKEND_URL}"
echo ">>> [nginx] Starting nginx..."

exec nginx -g 'daemon off;'
