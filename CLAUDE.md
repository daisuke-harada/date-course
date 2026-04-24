# date-course（モノレポルート）

デートスポット・デートコース管理アプリのモノレポ。Nginx がリクエストを振り分け、React フロントエンドと Rails / Go バックエンドで構成される。

## リポジトリ構成

```
date-course/
├── submodules/
│   ├── backend/
│   │   ├── rails/   # Rails 7.1 REST API（JWT 認証）
│   │   └── go/      # Go バックエンド（Rails リプレイス中）
│   └── frontend/
│       └── react/   # React 18 + TypeScript SPA
├── nginx/           # Nginx 設定（バックエンド切り替え対応）
├── compose.yml      # Docker Compose（全サービス）
└── Makefile         # 開発コマンド集
```

各サービスの詳細は各ディレクトリの `CLAUDE.md` を参照。

## 主要コマンド

```bash
make run-rails        # React + Rails + Nginx を起動
make run-go           # React + Nginx を起動（Go は別途 make go-up）
make go-up            # Go サーバーを DB 込みで起動
make switch-rails     # Nginx を Rails バックエンドに切り替え
make switch-go        # Nginx を Go バックエンドに切り替え
make rspec            # Rails の RSpec 実行
make curl-compare     # Rails と Go のレスポンスを並べて比較
```

## 開発ワークフロー

| 作業の種類 | 作成するもの |
|----------|------------|
| 実装・修正が完了したとき | **PR を作成する** |
| 設計・調査・計画のとき | **Issue を作成する** |

- 作業が終わったら必ず PR または Issue を作成して作業を記録する。
- 実装の PR は完了した実装をすべて含めてからマージ依頼すること。
- 設計・差分洗い出し・方針決定などはコードを伴わないため Issue にまとめる。

## バックエンド切り替え

Nginx の upstream を `.backend.env` で制御している。

| バックエンド | URL |
|-----------|-----|
| Rails | `http://backend_rails:7777` |
| Go | `http://host.docker.internal:1099`（ホストで go run） |

## 関連リポジトリ（スタンドアロンクローン）

| リポジトリ | 用途 |
|---------|-----|
| `date-course-react` | React フロントエンド単体開発 |
| `date-course-rails` | Rails バックエンド単体開発 |
| `date-courses-go` | Go バックエンド単体開発 |
