// サインイン
export type SignInParams = {
  name: string,
  password: string,
}

export type LoginState = {
  loginStatus: boolean;
  currentUser: User
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
  admin?: boolean,
  followingIds: number[],
  followerIds: number[],
}