import { atom } from "recoil";

export const loginStatusState = atom({
  // ファイル名と揃える
  key: "loginStatusState",
  default: { status: false}
});