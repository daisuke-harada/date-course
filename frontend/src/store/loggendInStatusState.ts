import { atom } from "recoil";

export const loggendInStatusState = atom({
  // ファイル名と揃える
  key: "loggendInStatusState",
  default: { status: false}
});