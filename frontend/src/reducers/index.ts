import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';

const store = configureStore({
  reducer: {
    session: loginReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
