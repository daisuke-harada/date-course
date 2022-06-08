# DateCourses
『DateCoruses』は無数のデートスポットを選択し、デートコースを作成するアプリです。<br/>
ログインすることでデートコースを作成できます。<br/>
(ゲストログインを用意しているので、簡単にログインできます)<br/>
デートスポットの作成に関しては管理者のみ作成できます（名前: admin, パスワード: adminstrator)<br/>
基本機能はログイン無しで閲覧可能ですのでお気軽にご覧下さい。<br/>


トップページ
<img width="1428" alt="スクリーンショット 2022-04-25 10 17 11" src="https://user-images.githubusercontent.com/59969400/165005761-1b973980-a182-4800-a6f6-9be323b367f5.png">
リンク

現在停止中
~~https://www.datecourses.com~~


# 特にみていただきたい点

- インフラ
  - Dockerを用いて、ECS(Fargate)で本番環境をサーバーレスで運用している点。
  - ALBを通すことで、常時SSL通信を行っている点。
  - S3で本番環境の画像の管理を行なっている点。
  - GitHubActionsを用いてCI/CDを行なっている点。

- フロントエンド
  - Reactを用いてSPA(SinglePagaApplication)を実装している点。
  - TypeScriptで開発を行なっている点。
  - CSSフレームワークにtailwindcssを利用している点。
  - atomicデザインを使用している点。

- バックエンド
  - RubyonRailsのAPIモードを利用し、APIサーバーとしてフロントエンドのリクエストに対してJSON形式でデータを返している点。

- テスト
  - バックエンドのテストとしてrspecを利用してrequestsテストとmodelテストを実装している点。
  - e2eテストとしてCypressを利用している点。

# 使用した技術

- フロントエンド
  - HTML/CSS
  - TypeScript
  - React.js 17.0.2
  - tailwindcss(CSSフレームワーク)
  - googleMapApi(Directions API MapsJavaScript API)
- バックエンド
  - Ruby 3.0.3
  - Ruby on Rails 6.1.4 (APIモード)
  - Rubocop（コード解析ツール）
  - RSpec（テスト)
  - googleMapApi(Geocoding API)
- インフラ・開発環境
  - Docker/docker-compose
  - AWS (ECR,ECS,VPC,S3,Route53,ALB,RDS,ACM, SSM）
  - GitHubActions(CI/CD)
- e2eテスト
  - cypress

# 機能一覧
## 基本機能
  - Topページ表示(都道県・ジャンルを全て表示、デートスポットのランキング表示)
  - デートスコース
    - デートコースをGoogleMapページで表示する機能
    - デートコース詳細ページ表示
    - デートコース一覧ページ表示
  - デートスポット
    - デートスポット名前検索機能
    - デートスポット一覧ページ表示(ランキング、デートスポット表示)
    - デートスポット詳細ページ表示(紐づくレビュー一覧表示)
  - ユーザー
    - ゲストログイン機能
    - ユーザーログイン機能
    - ユーザー新規登録機能
    - ユーザー詳細ページ表示(登録したデートコース・レビューしたデートスポット・フォロー・フォロワー表示)
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
  - デートスポットレビュー
    - デートスポットレビュー登録機能(対象のデートスポット詳細ページで行う)
    - デートスポットレビュー編集機能(対象のデートスポット詳細ページで行う)
    - デートスポットレビュー削除機能(対象のデートスポット詳細ページで行う)
    - 星による評価機能を実装
  - ユーザー
    - ユーザー情報更新機能
    - ユーザー退会機能
    - フォロー・フォロー解除機能
    - ユーザー編集ページ表示
## 管理者機能
  - デートスポット
    - デートスポット登録機能
    - デートスポット編集機能
    - デートコース削除機能
    - デートスポット新規登録ページ表示
    - デートスポット編集ページ表示
# ネットワーク構成図
<img width="580" alt="スクリーンショット 2022-04-25 10 11 33" src="https://user-images.githubusercontent.com/59969400/165005469-3ef607b5-e9b7-42b6-9a42-e1cc7481ccbc.png">

# ER図
<img width="652" alt="スクリーンショット 2022-04-26 10 24 49" src="https://user-images.githubusercontent.com/59969400/165200635-5b0973b2-c9e3-46d7-91a6-635eb4623fb6.png">
