export type UserResponseData = {
  id: number,
  name: string,
  gender: string,
  passwordDigeset: string,
  admin: boolean,
  created_at: Date,
  updated_at: Date,
};

export type UserLoginResponseData = {
  status?: string,
  loginStatus: boolean,
  user: UserResponseData,
};