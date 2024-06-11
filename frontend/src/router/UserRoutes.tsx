import { Page404 } from 'components/pages/Page404';
import { Edit } from 'components/pages/users/Edit';
import { Followers } from 'components/pages/users/Followers';
import { Followings } from 'components/pages/users/Followings';
import { Index } from 'components/pages/users/Index';
import { Search } from 'components/pages/users/Search';
import { New } from 'components/pages/users/New';
import { Show } from 'components/pages/users/Show';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  path: string,
  element: JSX.Element,
};

export const UserRoutes: () => Props[] = () => {
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus);
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
      element: getLoginStatus && Number(userId) === getCurrentUser.id?
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
      element: <New />
    },
    {
      path: 'search',
      element: <Search />
    },
    {
      path: '*',
      element: <Page404 />
    },
  ];
};