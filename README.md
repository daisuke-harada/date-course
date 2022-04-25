# DateCourses

リンク
https://www.datecourses.com/

トップページ

# 特にみていただきたい点

- インフラ
  - Dockerを用いて、ECS(Fargate)で本番環境をサーバーレスで運用している点。
  - ALBを通すことで、常時SSL通信を行っている点。
  - S3で本番環境の画像の管理を行なっている点。
  - GitHubActionsを用いてCI/CDを行なっている点。

- バックエンド
  - RubyonRailsのAPIモードを利用し、APIサーバーとしてフロントエンドのリクエストに対してJSON形式でデータを返している点。

- フロントエンド
  - Reactを用いてSPA(SinglePagaApplication)を実装している点。
  - TypeScriptで開発を行なっている点。
  - CSSフレームワークにtailwindcssを利用している点。

- テスト
  - バックエンドのテストとしてrspecを利用してrequestsテストとmodelテストを実装している点。
  - e2eテストとしてCypressを利用している点。

# 使用した技術

- フロントエンド
  - HTML/CSS
  - TypeScript
  - React.js
  - tailwindcss(CSSフレームワーク)
- バックエンド
  - Ruby 3.0.3
  - Ruby on Rails 6.1.4 (APIモード)
  - Rubocop（コード解析ツール）
  - RSpec（テスト）
- インフラ・開発環境
  - Docker/docker-compose
  - AWS (ECR,ECS,VPC,S3,Route53,ALB,RDS,ACM, SSM）
  - GitHubActions(CI/CD)
- e2eテスト
  - cypress

# ネットワーク構成図
<img width="791" alt="スクリーンショット 2022-04-25 10 02 57" src="https://user-images.githubusercontent.com/59969400/165005040-eba8dea9-e4c4-4102-872c-a67bd085f2df.png">


