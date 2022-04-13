import { BaseButton } from 'components/atoms/button/BaseButton';
import { SecondaryButton } from 'components/atoms/button/SecondaryButton';
import { useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';

export const HeaderTopLeftRoutes = () => {
  const getLoginsStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);

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

  if(getLoginsStatus.status && getCurrentUser.user.admin === false) {
    return userRoutes;
  }else if(getLoginsStatus.status && getCurrentUser.user.admin === true) {
    return adminRoutes;
  }else {
    return noLoginRoutes;
  };
};
