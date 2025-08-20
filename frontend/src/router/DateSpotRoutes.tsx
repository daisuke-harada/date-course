import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Edit } from 'components/pages/dateSpots/Edit';
import { Index } from 'components/pages/dateSpots/Index';
import { New } from 'components/pages/dateSpots/New';
import { Show } from 'components/pages/dateSpots/Show';
import { Page404 } from 'components/pages/Page404';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

export const DateSpotRoutes = () =>{
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  return[
    {
      path: ':id',
      element: <Show />
    },
    {
      path: ':id/edit',
      element: loginStatus && currentUser.admin === true ?
      <Edit /> :
      <Navigate to='/' state={{message: '管理者しかアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: 'index',
      element: <Index />
    },
    {
      path: 'new',
      element: loginStatus && currentUser.admin === true ?
      <New /> :
      <Navigate to='/' state={{message: '管理者しかアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: '*',
      element: <Page404 />
    },
  ];
};