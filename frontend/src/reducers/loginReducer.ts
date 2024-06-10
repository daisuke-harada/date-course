import { initialLoginState } from 'defaults/userDefaults';
import { SET_LOGIN_STATUS, SET_CURRENT_USER } from '../actions/sessionActions';
import { User } from "types/users/session";

type LoginAction = {
  type: typeof SET_LOGIN_STATUS;
  payload: boolean;
}

type CurrentUserAction = {
  type: typeof SET_CURRENT_USER;
  payload: User;
}

type Action = LoginAction | CurrentUserAction;

const loginReducer = (state = initialLoginState, action: Action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;