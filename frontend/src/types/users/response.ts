export type UserResponseData = {
  id: number,
  name: string,
  email: string,
  gender: string,
  passwordDigest: string,
  admin?: boolean,
  image?: {
    url: string | null
  },
  followingIds: Array<number>,
  followers_ids: Array<number>,
};

export type UserLoginResponseData = {
  status?: string,
  loginStatus: boolean,
  user: UserResponseData,
};