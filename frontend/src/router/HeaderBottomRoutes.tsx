import { useRecoilValue } from "recoil";

import { currentUserState, loginStatusState } from "store/session";


export const HeaderBottomRoutes =  () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUserInfo = useRecoilValue(currentUserState);

  const headers = [
    {
      text: "デートスポットを探す",
      dataE2e: 'dateSpot-index',
      path: "dateSpots/index"
    },
    {
      text: "デートコースを探す",
      dataE2e: 'dateCourse-index',
      path: "courses/index"
    },
    {
      text: "ユーザーを探す",
      dataE2e: 'user-index',
      path: "users/index"
    },
  ];

  getLoginStatus.status && headers.push({ text: "マイページ", dataE2e: 'myPage-data', path: `users/${getCurrentUserInfo.user.id}` });

  return headers;
}