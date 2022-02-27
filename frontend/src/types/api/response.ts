export type UserResponseData = {
  id: number,
  name: string,
  gender: string,
  passwordDigeset: string,
  admin: boolean,
  image?: {
    url: string
  },
  createdAt: Date,
  updatedAt: Date,
};

export type UserLoginResponseData = {
  status?: string,
  loginStatus: boolean,
  user: UserResponseData,
};