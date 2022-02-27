import { Edit } from "components/pages/courses/Edit";
import { Index } from "components/pages/courses/Index";
import { Show } from "components/pages/courses/Show";
import { Page404 } from "components/pages/Page404";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";


export const CourseRoutes = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);

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
      // TODO:そのデートコースを登録したユーザーのみがアクセスできるように改修する必要あり
      path: ":id/edit",
      element: getLoginStatus.status === true?
      <Edit /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ];
}
