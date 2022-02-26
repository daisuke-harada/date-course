import { Edit } from "components/pages/courses/Edit";
import { Index } from "components/pages/courses/Index";
import { Show } from "components/pages/courses/Show";
import { Page404 } from "components/pages/Page404";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";


export const CourseRoutes = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  const location = useLocation();
  // locationをグローバルステートに入れたら管理しやすくなるかな
  const userId: string = location.pathname.replace(/[^0-9]/g, '');


  return [
    {
      path: "index",
      element: <Index />,
    },
    {
      path: ":id",
      element: <Show />,
    },
    {
      path: ":id/edit",
      element: getLoginStatus.status === true && Number(userId) === getCurrentUser.user.id?
      <Edit /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ];
}
