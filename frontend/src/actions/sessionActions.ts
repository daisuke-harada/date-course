import { UserResponseData } from "types/users/response";

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setLoginStatus = (status: boolean) => ({
  type: SET_LOGIN_STATUS,
  payload: status
});

export const setCurrentUser = (user: UserResponseData | {}) => ({
  type: SET_CURRENT_USER,
  payload: user
});
