import { useSelector } from 'react-redux';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton';
import { User } from 'types/users/session';
import { RootState } from 'reducers';

export const HeaderTopLeftRoutes = () => {
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  const userRoutes = [
    {
      element: <BaseButton dataE2e='header-dateCourse-new-link' >デートコース作成</BaseButton>,
      path: 'managementCourses/createCourse',
    }
  ];

  const adminRoutes = [
    {
      element: <BaseButton dataE2e='header-dateSpot-new-link' >デートスポット作成</BaseButton>,
      path: 'dateSpots/new',
    }
  ];

  const noLoginRoutes = [
    {
      element: <BaseButton dataE2e='header-signup-link' >新規登録</BaseButton>,
      path: 'users/new'
    },
    {
      element: <SecondaryButton dataE2e='header-login-link'>ログイン</SecondaryButton>,
      path: 'login'
    },
  ];

  if(getLoginStatus && getCurrentUser.admin === true) {
    return adminRoutes;
  }else if(getLoginStatus ) {
    return userRoutes;
  }else {
    return noLoginRoutes;
  };
};
