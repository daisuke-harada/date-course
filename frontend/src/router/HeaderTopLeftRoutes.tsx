import { BaseButton } from "components/atoms/button/BaseButton";
import { SecondaryButton } from "components/atoms/button/SecondaryButton";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";

export const HeaderTopLeftRoutes = () => {
  const [headerRoutes, setHeaderRoutes] = useState([
    {
      element: <BaseButton dataE2e="header-signup-link" >新規登録</BaseButton>,
      path: "users/new"
    },
    {
      element: <SecondaryButton dataE2e="header-login-link">ログイン</SecondaryButton>,
      path: "login"
    },
  ]);

  const getLoginsStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    if(getLoginsStatus.status === true && getCurrentUser.user.admin === false) {
      setHeaderRoutes([{
        element: <BaseButton dataE2e="header-dateCourse-new-link" >デートコース作成</BaseButton>,
        path: "managementCourses/createCourse",
      }]);
    }else if(getLoginsStatus.status === true && getCurrentUser.user.admin === true) {
      setHeaderRoutes([{
        element: <BaseButton dataE2e="header-dateSpot-new-link" >デートスポット作成</BaseButton>,
        path: "dateSpots/new",
      }]);
    }else {
      setHeaderRoutes([
        {
          element: <BaseButton dataE2e="header-signup-link" >新規登録</BaseButton>,
          path: "users/new"
        },
        {
          element: <SecondaryButton dataE2e="header-login-link">ログイン</SecondaryButton>,
          path: "login"
        },
      ]);
    };
  }, [setHeaderRoutes, getLoginsStatus, getCurrentUser]);

  return headerRoutes;
};
