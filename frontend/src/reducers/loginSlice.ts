import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLoginState} from "defaults/userDefaults";
import { User } from "types/users/session";

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.loginStatus = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    }
  }
});

export const { setLoginStatus, setCurrentUser} = loginSlice.actions;
export default loginSlice.reducer;
