import { useSelector } from "react-redux";

import { RootState } from "reducers";
import { User } from "types/users/session";


export const HeaderBottomRoutes =  () => {
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const loginStatus = useSelector<RootState, User>(state => state.session.currentUser)

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

  loginStatus && currentUser.admin === false && headers.push({ text: 'マイページ', dataE2e: 'myPage-data', path: `users/${currentUser.id}` });

  return headers;
}