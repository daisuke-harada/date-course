import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//標準でrecoil-persistというkey名でwebstorageに保存される（オプションで指定可能）
const { persistAtom } = recoilPersist();

export const loginStatusState = atom({
  // ファイル名と揃える
  key: "loginStatusState",
  default: { status: false},
  effects_UNSTABLE: [persistAtom]
});

export const currentUserState = atom({
  // ファイル名と揃える
  key: "currentUserState",
  default: { user: {}},
  effects_UNSTABLE: [persistAtom]
});