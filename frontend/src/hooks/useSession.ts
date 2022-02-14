// ログインしたユーザーの情報とログイン状態をグローバルステートにセットする
import { useSetRecoilState } from "recoil";

import { currentUserState } from "../store/currentUserState";
import { loggendInStatusState } from "../store/loggendInStatusState";

export const useSessions = (data: any) => {
  const setUser = useSetRecoilState(currentUserState);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);
  setUser({current_user: data.user});
  setLoggedInStatus({loggedIn: true});
}