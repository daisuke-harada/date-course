import { LoginState, User } from "types/users/session";

export const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  passwordDigest: '',
  followingIds: [],
  followers_ids: [],
};

export const initialLoginState: LoginState = {
  loginStatus: false,
  currentUser: initialUser
};