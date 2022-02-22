import { useRecoilValue } from "recoil";

import { currentUserState, loginStatusState } from "store/session";


export const HeaderBottomRoutes =  () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUserInfo = useRecoilValue(currentUserState);

  const headers = [
    {
      text: "デートスポットを探す",
      path: "dateSpots/index"
    },
    {
      text: "デートコースを探す",
      path: "courses/index"
    },
    {
      text: "ユーザーを探す",
      path: "users/index"
    },
  ];

  getLoginStatus.status && headers.push({ text: "マイページ", path: `users/${getCurrentUserInfo.user.id}` });

  return headers;
}