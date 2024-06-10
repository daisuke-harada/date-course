import { CreateCourse } from 'components/pages/managementCourses/CreateCourse';
import { Page404 } from 'components/pages/Page404';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'reducers';

export const ManagementCourseRoutes = () => {
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  return [
    {
      // TODO:そのデートコースを登録したユーザーのみがアクセスできるように改修する必要あり
      path: 'createCourse',
      element: getLoginStatus?
      <CreateCourse /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};