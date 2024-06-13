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
  followingIds: number[],
  followerIds: number[],
};

export type UserLoginResponseData = {
  status?: string,
  loginStatus: boolean,
  user: UserResponseData,
};