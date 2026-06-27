# DateCourses 💑

**無数のデートスポットから、自分だけのデートコースを作成・共有できる Web アプリケーション。**

> 🎯 **このリポジトリの一番の見どころ**
> フロントエンド（React）を一切止めずに、**バックエンドを Rails ↔ Go でシームレスに切り替えられる**構成にしています。
> これは実務で経験した「**PHP → Go への段階的リプレイス**」を、個人開発で再現・検証するために設計したものです。
> Nginx の向き先を変えるだけで、同一の API 契約（OpenAPI）に対して 2 つの実装を差し替えられます。

<!-- TODO: トップページのスクリーンショット / デモGIF をここに差し替え -->
![トップページ](https://user-images.githubusercontent.com/59969400/165005761-1b973980-a182-4800-a6f6-9be323b367f5.png)

| | |
|---|---|
| 🌐 デモ | ~~https://www.datecourses.com~~ （現在停止中・再公開準備中） |
| 🔑 お試し | ゲストログインあり（登録不要で全機能を試せます） |
| 👤 管理者 | name: `admin` / password: `adminstrator`（デートスポット登録が可能） |

---

## 目次

- [プロジェクトの構成（リポジトリ地図）](#プロジェクトの構成リポジトリ地図)
- [アーキテクチャ：Rails ↔ Go 切り替えの仕組み](#アーキテクチャrails--go-切り替えの仕組み)
- [技術的なこだわり・工夫した点](#技術的なこだわり工夫した点)
- [使用技術](#使用技術)
- [ローカル開発環境](#ローカル開発環境)
- [機能一覧](#機能一覧)
- [構成図・ER図](#構成図er図)

---

## プロジェクトの構成（リポジトリ地図）

このリポジトリは **モノレポのルート**です。フロントエンド・バックエンドは Git サブモジュールとして独立管理し、**CI/CD をリポジトリごとに分離**しています。

```
date-course/ （← 今ここ：統合・起動・Nginx 切り替えを司るルート）
├── submodules/
│   ├── frontend/react/   → date-course-react   (React 18 + TypeScript SPA)
│   └── backend/
│       ├── rails/        → date-course-rails   (Ruby on Rails 7.1 / 旧実装・基準)
│       └── go/           → date-courses-go      (Go + Echo / リプレイス実装)
├── nginx/                Nginx 設定（バックエンド切り替え）
├── compose.yml           Docker Compose（全サービス）
└── Makefile              開発コマンド集
```

| リポジトリ | 役割 | 主な技術 |
|---|---|---|
| **date-course**（本リポジトリ） | 統合・起動・バックエンド切り替え | Docker Compose / Nginx / Make |
| [date-course-react](https://github.com/daisuke-harada/date-course-React) | フロントエンド | React 18 / TypeScript / Tailwind / Redux |
| [date-course-rails](https://github.com/daisuke-harada/date-course-rails) | バックエンド（基準実装） | Ruby on Rails 7.1 (API) / RSpec |
| [date-courses-go](https://github.com/daisuke-harada/date-courses-go) | バックエンド（リプレイス実装） | Go / Echo / OpenAPI / AWS Lambda |

---

## アーキテクチャ：Rails ↔ Go 切り替えの仕組み

React は常に Nginx（port 8080）経由で API を叩きます。**Nginx の upstream を切り替えるだけ**で、React を再起動せずに Rails と Go を入れ替えられます。

```
        React (port 3000)
            │  API リクエスト
            ▼
        Nginx (port 8080)  ◀── make switch-rails / make switch-go
            │
   ┌────────┴────────┐
   ▼                 ▼
Rails (7777)      Go (1099)
   └─── 同一の OpenAPI 契約に準拠 ───┘
```

**なぜこの構成にしたか（設計意図）**

- 実務での PHP→Go リプレイスでは「**外形（API レスポンス）を一切変えずに中身だけ差し替える**」ことが最重要だった。これを個人開発でも安全に行える土台が欲しかった。
- フロントとバックを疎結合にし、**フロントに影響を与えずバックエンドだけを差し替え**られるよう、Docker のネットワーク／プロファイル機能で抽象化。
- 2 実装のレスポンス同一性を機械的に確認できるよう、`make curl-compare` で **Rails と Go に同じリクエストを投げて差分比較**できるようにした（＝移植のリグレッション検知）。

---

## 技術的なこだわり・工夫した点

<details>
<summary><b>① バックエンドの差し替え可能性（Rails ↔ Go）</b></summary>

- 同一の OpenAPI 契約に対して 2 実装を用意し、Nginx で切替。フロントは無改修。
- `make curl-compare` でレスポンスの差分を検証し、移植の正しさを担保。
- CI/CD をリポジトリごとに独立させ、各バックエンドを単体で開発・デプロイ可能。
</details>

<details>
<summary><b>② インフラ（IaC / サーバレス）</b></summary>

- Rails 版: Docker イメージを **ECS(Fargate)** でサーバレス運用。**ALB** で常時 SSL、画像は **S3**、CI/CD は **GitHub Actions**。
- Go 版（date-courses-go）: **AWS Lambda + API Gateway + SAM(IaC)** によるフルサーバレス構成へ発展。
- インフラ構成は別リポジトリ [date-course-terraform] でコード管理。
</details>

<details>
<summary><b>③ フロントエンド</b></summary>

- React + TypeScript の SPA。状態管理は Redux、UI は Tailwind CSS、Atomic Design でコンポーネントを整理。
- Google Maps API（Directions / Maps JavaScript API）でデートコースを地図上に可視化。
</details>

<details>
<summary><b>④ テスト</b></summary>

- バックエンド: RSpec（request / model テスト）。
- E2E: Cypress。
- Go 版は OpenAPI からの型安全なハンドラ生成 ＋ `go test`。
</details>

<details>
<summary><b>⑤ 実データの扱い（レビュー機能は本番で非表示）</b></summary>

- デートスポットは HotPepper グルメAPIから取得した**実在・実名の店舗**。これに自作のユーザーレビュー（第三者評価）を公開すると**信用毀損・風評のリスク**があるため、**レビュー・評価（星）・人気ランキングUI は本番では非表示**にしている（フィーチャーフラグ `REACT_APP_ENABLE_REVIEWS`／ローカルでのみ有効化）。
- 食べログ・ぐるなびの評価APIは取得不可（提供終了/有料）のため、正当な評価を載せる手段が無いことも踏まえた判断。
- 実在店の正確な情報は、各スポットの **HotPepper 店舗ページへの導線**で本家へ誘導する方針。
</details>

---

## 使用技術

| 領域 | 技術 |
|---|---|
| フロントエンド | TypeScript / React 18.3.1 / Tailwind CSS / Redux / Google Maps API |
| バックエンド（基準） | Ruby 3.1.2 / Ruby on Rails 7.1.0（API モード）/ RuboCop / RSpec |
| バックエンド（リプレイス） | Go / Echo / OpenAPI / JWT |
| インフラ | Docker / docker-compose / Nginx / AWS（ECR, ECS Fargate, VPC, S3, Route53, ALB, RDS, ACM, SSM, Lambda）/ Terraform |
| CI/CD | GitHub Actions |
| E2E テスト | Cypress |

---

## ローカル開発環境

### 初回セットアップ

```bash
# サブモジュールを取得
git submodule update --init --recursive

# .backend.env 作成・イメージビルド・DB 初期化
make setup
```

### 起動

```bash
# React + Rails で起動
make run-rails

# React + Go で起動（ターミナルを2つ使用）
make go-up      # ターミナル1: Go サーバー（DB初期化→seed→起動）
make run-go     # ターミナル2: Nginx を Go モードにして React + Nginx 起動
```

### バックエンドの切り替え

```bash
make switch-rails   # → Rails に切り替え
make switch-go      # → Go に切り替え
make backend-status # 現在どちらが有効か確認
```

Nginx が数秒で再起動し、React を再起動せずにバックエンドが切り替わります。

### よく使うコマンド

| コマンド | 内容 |
|---|---|
| `make db-migrate` | Rails の DB マイグレーション |
| `make db-seed` | Rails の seed データ投入 |
| `make rails-db-reset` | Rails の DB データをリセット（テーブル構造は保持） |
| `make go-db-reset` | Go の DB データをリセット |
| `make rspec` | RSpec テストを実行 |
| `make curl-compare` | 起動中の Rails と Go に同じリクエストを投げてレスポンスを比較 |
| `make rails-down` / `make go-down` | 各バックエンドの停止（ボリュームも削除） |

---

## 機能一覧

### 基本機能（ログイン不要）
- Top ページ（都道府県・ジャンル一覧、デートスポットのランキング表示）
- デートコース：地図表示 / 詳細ページ / 一覧ページ
- デートスポット：名前検索 / 一覧（ランキング）/ 詳細（紐づくレビュー一覧）
- ユーザー：ゲストログイン / ログイン / 新規登録 / 詳細（登録コース・レビュー・フォロー/フォロワー）/ 一覧
- 検索：デートコースをエリアで検索 / デートスポットを県名・ジャンルで条件検索 / ユーザーを名前で検索

### ログイン後機能
- デートコース作成：スポットの追加 / 入れ替え / 削除 / 全削除 / 既存コースのコピー
- デートスポットレビュー：登録 / 編集 / 削除 / 星による評価
- ユーザー：情報更新 / 退会 / フォロー・フォロー解除

### 管理者機能
- デートスポット：登録 / 編集 / 削除

---

## 構成図・ER図

### ネットワーク構成図
![ネットワーク構成図](https://user-images.githubusercontent.com/59969400/165005469-3ef607b5-e9b7-42b6-9a42-e1cc7481ccbc.png)

### ER図
![ER図](https://user-images.githubusercontent.com/59969400/165200635-5b0973b2-c9e3-46d7-91a6-635eb4623fb6.png)
