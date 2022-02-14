import { atom } from "recoil";

export const currentUserState = atom({
  // ファイル名と揃える
  key: "currentUserState",
  default: { current_user: {}}
});