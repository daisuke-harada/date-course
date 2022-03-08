// サインアップ
export type SignUpParams = {
  name: string,
  email: string,
  gender: string,
  image?: {
    url: string | null
  },
  password: string,
  passwordConfirmation: string,
}

// サインイン
export type SignInParams = {
  name: string,
  password: string,
}

// ユーザー
export type User = {
  id: number,
  name: string,
  email: string,
  gender: string,
  image?: {
    url: string | null
  },
  passwordDigest: string,
  admin?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
}