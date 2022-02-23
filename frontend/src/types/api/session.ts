// サインアップ
export type SignUpParams = {
  name: string
  email: string
  gender: string
  image?: File
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
  image?: File
  password: string
  passwordConfirmation: string
  admin?: boolean
  created_at: Date
  updated_at: Date
}