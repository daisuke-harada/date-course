export type UserResponseData = {
  id: number,
  name: string,
  email: string,
  gender: string,
  passwordDigeset: string,
  admin: boolean,
  image?: {
    url: string | null
  },
  createdAt: Date,
  updatedAt: Date,
};

export type UserLoginResponseData = {
  status?: string,
  loginStatus: boolean,
  user: UserResponseData,
};