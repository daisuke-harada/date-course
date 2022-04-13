import { CreateCourse } from 'components/pages/managementCourses/CreateCourse';
import { Page404 } from 'components/pages/Page404';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStatusState } from 'store/session';

export const ManagementCourseRoutes = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);

  return [
    {
      // TODO:そのデートコースを登録したユーザーのみがアクセスできるように改修する必要あり
      path: 'createCourse',
      element: getLoginStatus.status === true?
      <CreateCourse /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];
};