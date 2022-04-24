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
  - UIフレームワークにtailwindcssを利用している点。

- テスト
  - バックエンドのテストとしてrspecを利用してrequestsテストとmodelテストを実装している点。
  - e2eテストとしてCypressを利用している点。


