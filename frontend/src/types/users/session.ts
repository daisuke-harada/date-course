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
  followingIds: number[],
  followers_ids: number[],
}