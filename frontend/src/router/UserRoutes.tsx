import { Page404 } from 'components/pages/Page404';
import { Edit } from 'components/pages/users/Edit';
import { Followers } from 'components/pages/users/Followers';
import { Followings } from 'components/pages/users/Followings';
import { Index } from 'components/pages/users/Index';
import { New } from 'components/pages/users/New';
import { Show } from 'components/pages/users/Show';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';

type Props = {
  path: string,
  element: JSX.Element,
};

export const UserRoutes: () => Props[] = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  const location = useLocation();
  // locationをグローバルステートに入れたら管理しやすくなるかな
  const userId: string = location.pathname.replace(/[^0-9]/g, '');

  return [
    {
      path: ':id',
      element: <Show />
    },
    {
      path: ':id/edit',
      element: getLoginStatus.status === true && Number(userId) === getCurrentUser.user.id?
      <Edit /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: ':id/followings',
      element: <Followings />
    },
    {
      path: ':id/followers',
      element: <Followers />
    },
    {
      path: 'index',
      element: <Index />
    },
    {
      path: 'new',
      element: getLoginStatus.status === false?
      <New /> :
      <Navigate to='/' state={{message: 'ログイン中はアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: '*',
      element: <Page404 />
    },
  ];
};