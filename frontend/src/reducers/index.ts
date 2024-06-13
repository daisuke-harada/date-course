import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './loginSlice';
import currentDateCourseReducer from './currentDateCourseSlice';

// key: 'root' は、永続化された状態のキーを指定します。
// storage は、使用するストレージエンジンを指定します（ここではlocalStorage）。
// whitelist は、永続化するreducerのリストを指定します（ここでは'session'のみ）。
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'currentDateCourse']
};

// reducerをまとめます
const rootReducer = combineReducers({
  session: loginReducer,
  currentDateCourse: currentDateCourseReducer
});

// すべてのreducerの中からwhitelistで指定されたものだけ永続化するようにする
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Reduxのデフォルトミドルウェアは、アクションや状態がシリアライズ可能（JSONに変換可能）であることを期待しています。
      // シリアライズできないデータ（例えば、関数や特殊なオブジェクト）が含まれていると、警告やエラーが発生する可能性があります。
      // persist/PERSISTアクションはredux-persistが使用するもので、シリアライズできないデータを含むことがあるため、以下のようにシリアライズチェックから除外しています。
      ignoredActions: ['persist/PERSIST']
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
