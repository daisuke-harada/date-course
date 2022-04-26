import { useRecoilValue } from 'recoil';

import { currentUserState, loginStatusState } from 'store/session';


export const HeaderBottomRoutes =  () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);

  const headers = [
    {
      text: 'Topページ',
      dataE2e: 'top-link',
      path: '/'
    },
    {
      text: 'デートスポットを探す',
      dataE2e: 'dateSpot-index',
      path: 'dateSpots/index'
    },
    {
      text: 'デートコースを探す',
      dataE2e: 'dateCourse-index',
      path: 'courses/index'
    },
    {
      text: 'ユーザーを探す',
      dataE2e: 'user-index',
      path: 'users/index'
    },
  ];

  getLoginStatus.status && getCurrentUser.user.admin === false && headers.push({ text: 'マイページ', dataE2e: 'myPage-data', path: `users/${getCurrentUser.user.id}` });

  return headers;
}