# date-course（モノレポルート）

デートスポット・デートコース管理アプリのモノレポ。React フロントエンドと Go バックエンドで構成される。

**現在 Rails から Go へのリプレイス開発中。** ローカルで起動するのは Go + React のみで、React は Go サーバー（port 1099）を直接叩く。Rails / Nginx は停止中（`compose.yml` / `Makefile` でコメントアウト）。

## リポジトリ構成

```
date-course/
├── submodules/
│   ├── backend/
│   │   ├── go/      # Go バックエンド（リプレイス先・現行）
│   │   └── rails/   # Rails 7.1 REST API（リプレイス元・停止中）
│   └── frontend/
│       └── react/   # React 18 + TypeScript SPA
├── nginx/           # Nginx 設定（Rails 併用時代の残存・現在未使用）
├── scripts/         # curl-compare.sh（Rails ↔ Go 比較用・現在未使用）
├── compose.yml      # Docker Compose（react のみ有効）
└── Makefile         # 開発コマンド集
```

各サービスの詳細は各ディレクトリの `CLAUDE.md` を参照（Go 側は未作成）。

## 主要コマンド

```bash
make up            # Go + React をまとめて起動（停止は Ctrl+C）
make down          # Go と React を停止（Go の DB コンテナは残る）
make go-up         # Go サーバーを起動（MySQL 起動 → mysqldef で schema 適用 → seed → go run）
make run-react     # React 開発サーバーのみ起動
make go-down       # Go の DB コンテナ・ボリュームごと削除
make go-db-reset   # Go の DB をボリュームごと削除して再作成・schema 再適用
make build         # Docker イメージをビルド
make kill-all-ports # React(3000) / Go(1099) / Go DB(15432) のプロセスを kill
make shell-go      # Go サブモジュールでシェルを開く
make shell-react   # React サブモジュールでシェルを開く
```

Go サーバーはコンテナではなくホストで `go run` する。`go` と `mysqldef` がローカルに必要。

## 環境変数

いずれも Git 管理外。ルートは `.envrc.example` から作成する。

| ファイル | 用途 |
|--------|------|
| `.envrc` | `compose.yml`（react サービス）が参照。`REACT_FRONTEND_PATH` / `REACT_FRONTEND_PORT` |
| `submodules/frontend/react/.env` | `REACT_APP_GOOGLE_MAP_API_KEY` ほか。`.env.example` あり |
| `submodules/backend/go/.envrc` | `DB_*` / `GOOGLE_MAPS_API_KEY`（Places API）/ `RECRUIT_API_KEY`（HotPepper）/ `JWT_SECRET_KEY` |

Makefile は `set -a && . ./.envrc && set +a && docker compose` の形で `.envrc` を読むため、`.envrc` が無いと `make build` / `make up` が失敗する。

## ポート

| サービス | ポート |
|--------|------|
| React | 3000 |
| Go | 1099 |
| Go の MySQL | 15432 |

## 開発ワークフロー

| 作業の種類 | 作成するもの |
|----------|------------|
| 実装・修正が完了したとき | **PR を作成する** |
| 設計・調査・計画のとき | **Issue を作成する** |

- 作業が終わったら必ず PR または Issue を作成して作業を記録する。
- 実装の PR は完了した実装をすべて含めてからマージ依頼すること。
- 設計・差分洗い出し・方針決定などはコードを伴わないため Issue にまとめる。

## リプレイス状況

- API 契約は `submodules/backend/go/api/OpenAPI.yaml` で定義し、`oapi-codegen` でハンドラのインターフェースを生成する。
- **未対応**: デートスポットレビュー（登録・編集・削除・星評価）とレビュー由来のランキング。Go 側は OpenAPI・ハンドラとも未実装で、React 側もフィーチャーフラグ `REACT_APP_ENABLE_REVIEWS` で非表示にしている。
- Rails に戻す場合は `compose.yml` と `Makefile` のコメントを解除し、React の環境変数を Nginx 経由（`http://localhost:8080`）に戻す必要がある。

## 関連リポジトリ（スタンドアロンクローン）

| リポジトリ | 用途 |
|---------|-----|
| `date-course-react` | React フロントエンド単体開発 |
| `date-courses-go` | Go バックエンド単体開発 |
| `date-course-rails` | Rails バックエンド単体開発（停止中） |
