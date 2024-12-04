import applyCaseMiddleware from 'axios-case-converter'
import axios, { AxiosResponse } from 'axios'

const options = {
  // ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
  ignoreHeaders: true,
  // // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める物で、trueにすることで含めることができる
  // withCredentials: true,
};

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ
export const client = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN_API,
}), options);

export const formDataClient = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN_API,
  headers: {
    'content-type': 'multipart/form-data',
  },
}));

// formDataClient.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     const data = response.data
//     return { ...response.data, data }
//   }
// )
