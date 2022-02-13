// サインアップ
export type SignUpParams = {
  name: string
  email: string
  gender: number
  password: string
  passwordConfirmation: string
}

// サインイン
export type SignInParams = {
  email: string
  password: string
}

// ユーザー
export type User = {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  gender: number
  nickname?: string
  image?: string
  admin: boolean
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}