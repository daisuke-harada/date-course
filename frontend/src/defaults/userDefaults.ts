import { LoginState, User } from "types/users/session";

export const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  gender: '',
  followingIds: [],
  followerIds: [],
};

export const initialLoginState: LoginState = {
  loginStatus: false,
  currentUser: initialUser
};