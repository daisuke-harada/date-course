import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

const options = {
  // ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
  ignoreHeaders: true,
  // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める物で、trueにすることで含めることができる
  withCredentials: true,
};

export const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:7777/api/v1"
}), options)
