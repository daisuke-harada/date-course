#!/usr/bin/env bash
# =============================================================================
# curl-compare.sh
# Rails (port:7777) と Go (port:1099) の同一エンドポイントに同時 curl を実行し、
# レスポンスの差分を表示するスクリプト。
#
# 使い方:
#   ./scripts/curl-compare.sh GET   /api/v1/date_spots
#   ./scripts/curl-compare.sh GET   /api/v1/date_spots "prefecture_id=1&genre_id=2"
#   ./scripts/curl-compare.sh POST  /api/v1/login      "" "name=test1&password=password"
# =============================================================================
set -euo pipefail

# --- 設定 -------------------------------------------------------------------
RAILS_BASE="${RAILS_BASE:-http://localhost:7777}"
GO_BASE="${GO_BASE:-http://localhost:1099}"
DIFF_TOOL="${DIFF_TOOL:-diff}"           # diff / colordiff / delta など

# --- 引数パース -------------------------------------------------------------
METHOD="${1:-GET}"
PATH_ARG="${2:-/api/v1/date_spots}"
QUERY="${3:-}"           # クエリパラメーター (例: "prefecture_id=1&genre_id=2")
BODY="${4:-}"            # リクエストボディ   (例: "name=foo&password=bar")
CONTENT_TYPE="${5:-application/x-www-form-urlencoded}"

# --- URL 組み立て -----------------------------------------------------------
if [[ -n "$QUERY" ]]; then
  RAILS_URL="${RAILS_BASE}${PATH_ARG}?${QUERY}"
  GO_URL="${GO_BASE}${PATH_ARG}?${QUERY}"
else
  RAILS_URL="${RAILS_BASE}${PATH_ARG}"
  GO_URL="${GO_BASE}${PATH_ARG}"
fi

# --- 一時ファイル -----------------------------------------------------------
TMP_DIR=$(mktemp -d)
RAILS_OUT="${TMP_DIR}/rails.json"
GO_OUT="${TMP_DIR}/go.json"
trap 'rm -rf "$TMP_DIR"' EXIT

# --- curl オプション組み立て ------------------------------------------------
CURL_OPTS=(-s -X "$METHOD")
if [[ -n "$BODY" ]]; then
  CURL_OPTS+=(-H "Content-Type: ${CONTENT_TYPE}" -d "$BODY")
fi

# --- 同時実行 ---------------------------------------------------------------
echo ""
echo "========================================================"
echo "  METHOD  : ${METHOD}"
echo "  PATH    : ${PATH_ARG}"
echo "  QUERY   : ${QUERY:-<none>}"
echo "  BODY    : ${BODY:-<none>}"
echo "========================================================"
echo ""
echo ">>> Sending requests simultaneously..."
echo "    Rails : ${RAILS_URL}"
echo "    Go    : ${GO_URL}"
echo ""

curl "${CURL_OPTS[@]}" "$RAILS_URL" | jq --sort-keys '.' > "$RAILS_OUT" 2>/dev/null &
RAILS_PID=$!
curl "${CURL_OPTS[@]}" "$GO_URL"    | jq --sort-keys '.' > "$GO_OUT"    2>/dev/null &
GO_PID=$!

wait "$RAILS_PID" "$GO_PID"

# --- diff 表示 --------------------------------------------------------------
echo "========================================================"
echo "  DIFF  (--- Rails   +++ Go)"
echo "========================================================"

if $DIFF_TOOL --color=always -u \
    --label "Rails (${RAILS_URL})" \
    --label "Go    (${GO_URL})" \
    "$RAILS_OUT" "$GO_OUT"; then
  echo ""
  echo "✅  No differences found."
else
  echo ""
  echo "⚠️   Differences detected above."
fi

echo ""
echo "--- Rails response ------------------------------------------------"
cat "$RAILS_OUT" | jq -S .
echo ""
echo "--- Go response ---------------------------------------------------"
cat "$GO_OUT" | jq -S .
