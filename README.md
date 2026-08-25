# DateCourses

『DateCourses』は無数のデートスポットを選択し、デートコースを作成するアプリです。<br/>
ログインすることでデートコースを作成できます。<br/>
(ゲストログインを用意しているので、簡単にログインできます)<br/>
デートスポットの作成に関しては管理者のみ作成できます（名前: admin, パスワード: adminstrator)<br/>
基本機能はログイン無しで閲覧可能ですのでお気軽にご覧下さい。<br/>

トップページ
<img width="1428" alt="スクリーンショット 2022-04-25 10 17 11" src="https://user-images.githubusercontent.com/59969400/165005761-1b973980-a182-4800-a6f6-9be323b367f5.png">

# 現在の開発状況

**バックエンドを Ruby on Rails から Go へリプレイス開発中です。**

- 現在ローカルで起動するのは **Go + React** の構成のみです。React は Go サーバー（port 1099）を直接叩きます。
- Rails 実装は `submodules/backend/rails` に残していますが、起動対象から外しています（`compose.yml` / `Makefile` でコメントアウト）。
- 本番環境は停止中のため、デプロイ（CD）も無効化しています。動作確認はローカル環境で行ってください。

# ローカル開発環境

```
React (port 3000)
    ↓ API リクエスト
Go (port 1099)
    ↓
MySQL (port 15432)
```

Go サーバーはコンテナではなくホストで直接実行するため、`go` と [`mysqldef`](https://github.com/sqldef/sqldef) がローカルにインストールされている必要があります。

## 初回セットアップ

```bash
# サブモジュールを取得
git submodule update --init --recursive

# 環境変数ファイルを作成する
cp .envrc.example .envrc
cp submodules/frontend/react/.env.example submodules/frontend/react/.env

# Docker イメージをビルド
make build
```

Go 側の環境変数は `submodules/backend/go/.envrc` に作成します（いずれも Git 管理外）。

| ファイル | 主な変数 |
|---|---|
| `.envrc`（ルート） | `REACT_FRONTEND_PATH` / `REACT_FRONTEND_PORT` |
| `submodules/frontend/react/.env` | `REACT_APP_GOOGLE_MAP_API_KEY`（Maps JavaScript API）※ 接続先は `compose.yml` が `http://localhost:1099/api/v1` を渡すため設定不要 |
| `submodules/backend/go/.envrc` | `DB_*`（MySQL 接続情報）/ `RECRUIT_API_KEY`（HotPepper グルメAPI）/ `JWT_SECRET_KEY` / `GOOGLE_MAPS_API_KEY`（現状コードからは未使用だが必須項目のため要設定） |

## 起動する

```bash
# Go + React をまとめて起動（停止は Ctrl+C）
make up
```

ターミナルを分けて動かす場合:

```bash
# ターミナル1: Go サーバー（MySQL 起動 → schema 適用 → seed 投入 → サーバー起動）
make go-up

# ターミナル2: React 開発サーバー
make run-react
```

## 停止する

```bash
# Go と React を停止（Go の DB コンテナは残る）
make down

# Go の DB コンテナ・ボリュームごと削除
make go-down
```

## その他のコマンド

| コマンド | 内容 |
|---|---|
| `make build` | Docker イメージをビルド |
| `make go-db-reset` | Go の DB をボリュームごと削除して再作成・schema 再適用 |
| `make kill-all-ports` | React(3000) / Go(1099) / Go DB(15432) のプロセスを kill |
| `make shell-go` | Go サブモジュールでシェルを開く |
| `make shell-react` | React サブモジュールでシェルを開く |

# リポジトリ構成

このリポジトリはモノレポのルートです。フロントエンド・バックエンドは Git サブモジュールとして独立管理し、リポジトリごとに CI を実行しています。

```
date-course/
├── submodules/
│   ├── backend/
│   │   ├── go/      # Go バックエンド（リプレイス先・現行）
│   │   └── rails/   # Rails バックエンド（リプレイス元・停止中）
│   └── frontend/
│       └── react/   # React 18 + TypeScript SPA
├── .envrc.example   # 環境変数のテンプレート
├── compose.yml      # Docker Compose
└── Makefile         # 開発コマンド集
```

| リポジトリ | 役割 |
|---|---|
| [date-course-React](https://github.com/daisuke-harada/date-course-React) | フロントエンド |
| [date-courses-go](https://github.com/daisuke-harada/date-courses-go) | バックエンド（リプレイス先） |
| [date-course-rails](https://github.com/daisuke-harada/date-course-rails) | バックエンド（リプレイス元・停止中） |

# 特にみていただきたい点

- リプレイス
  - フロントエンドとバックエンドを Git サブモジュールで独立管理し、リポジトリ単位でバックエンドを差し替えられる構成にしている点。
  - OpenAPI で API 契約を定義し、`oapi-codegen` でハンドラのインターフェースを生成することで、Rails 版と同じレスポンス形式を機械的に担保している点。

- 外部API連携
  - HotPepper グルメAPI から店舗情報を取得し、Wikimedia API で画像を補完してデートスポットとして DB に一括登録するバッチ（`cmd/batch`）を実装している点。

- バックエンド（Go）
  - レイヤードアーキテクチャ（domain / usecase / interface / infrastructure）で責務を分離している点。
  - DI コンテナ（`uber-go/dig`）と `uber-go/mock` により、ハンドラごとのユニットテストを書ける構成にしている点。
  - `mysqldef` で SQL スキーマファイルから宣言的にマイグレーションを行なっている点。
  - JWT による認証を実装している点。

- フロントエンド
  - Reactを用いてSPA(SinglePagaApplication)を実装している点。
  - TypeScriptで開発を行なっている点。
  - CSSフレームワークにtailwindcssを利用している点。
  - atomicデザインを使用している点。
  - Redux Toolkitで状態管理をしている点。

- テスト・CI
  - Go のハンドラ・ユースケースに対して `go test` でユニットテストを実装している点。
  - Go リポジトリの GitHub Actions で、PR ごとに golangci-lint / build / test を実行している点。

# 使用した技術

- フロントエンド
  - HTML/CSS
  - TypeScript 5.4
  - React.js 18.3.1
  - tailwindcss(CSSフレームワーク)
  - Redux Toolkit / redux-persist
  - googleMapApi(Directions API MapsJavaScript API)
- バックエンド
  - Go 1.26
  - Echo（Web フレームワーク）
  - GORM / MySQL
  - oapi-codegen（OpenAPI からのコード生成）
  - mysqldef（宣言的マイグレーション）
  - uber-go/dig（DI）・uber-go/mock（モック生成）
  - JWT（認証）
  - golangci-lint（コード解析ツール）
- 外部API
  - HotPepper グルメAPI（デートスポット情報の取得）
  - Wikimedia API（画像の取得）
- 開発環境
  - Docker/docker-compose
  - GitHubActions(CI)

# 機能一覧

## 基本機能
  - Topページ表示(都道県・ジャンルを全て表示)
  - デートコース
    - デートコースをGoogleMapページで表示する機能
    - デートコース詳細ページ表示
    - デートコース一覧ページ表示
  - デートスポット
    - デートスポット名前検索機能
    - デートスポット一覧ページ表示
    - デートスポット詳細ページ表示
  - ユーザー
    - ゲストログイン機能
    - ユーザーログイン機能
    - ユーザー新規登録機能
    - ユーザー詳細ページ表示(登録したデートコース・フォロー・フォロワー表示)
    - ユーザー新規登録ページ表示
    - ユーザー一覧ページ表示
    - フォロー中一覧ページ表示
    - フォロワー一覧ページ表示
  - 検索機能
    - デートコースを都道府県エリアで検索する機能
    - デートスポット条件検索機能(県名、ジャンルで検索)
    - ユーザーを名前で検索する機能

## ログイン後機能
  - デートコース
    - デートスポットを作成中のデートコースに追加する機能
    - デートコース内のデートスポットを入れ替える機能
    - デートコース内のデートスポットを削除する機能
    - デートコース内のデートスポットを全て削除する機能
    - デートコース情報をデートコース作成ページにコピーする機能
    - デートコース作成ページ表示
    - デートコース削除機能
  - ユーザー
    - ユーザー情報更新機能
    - ユーザー退会機能
    - フォロー・フォロー解除機能
    - ユーザー編集ページ表示

## 管理者機能
  - デートスポット
    - デートスポット登録機能
    - デートスポット編集機能
    - デートスポット削除機能
    - デートスポット新規登録ページ表示
    - デートスポット編集ページ表示

## 廃止予定の機能

Rails 版にはあるが Go 版では未実装で、現在は無効化している機能です。

  - デートスポットレビュー（登録・編集・削除・星による評価）
  - レビューを元にしたデートスポットのランキング表示

デートスポットは HotPepper グルメAPI から取得した実在・実名の店舗です。実在する店舗に自作のユーザーレビュー（第三者評価）を公開すると信用毀損・風評のリスクがあるため、Go 版へは移植せず廃止する方針です。

# ER図
<img width="652" alt="スクリーンショット 2022-04-26 10 24 49" src="https://user-images.githubusercontent.com/59969400/165200635-5b0973b2-c9e3-46d7-91a6-635eb4623fb6.png">
