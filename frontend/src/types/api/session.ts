// サインアップ
export type SignUpParams = {
  name: string
  email: string
  gender: string
  image?: {
    url: string
  }
  password: string
  passwordConfirmation: string
}

// サインイン
export type SignInParams = {
  name: string
  password: string
}

// ユーザー
export type User = {
  id: number
  name: string
  gender: string
  image?: {
    url: string
  }
  passwordDigeset: string
  admin?: boolean
  createdAt?: Date
  updatedAt?: Date
}