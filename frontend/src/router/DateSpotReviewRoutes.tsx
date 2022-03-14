import { Edit } from "components/pages/dateSpotReviews/Edit";
import { Page404 } from "components/pages/Page404";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";


export const DateSpotReviewRoutes = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);

  return [
    {
      // TODO:そのデートスポットレビューを登録したユーザーのみがアクセスできるように改修する必要あり
      path: ":id/edit",
      element: getLoginStatus.status === true?
      <Edit /> :
      <Navigate to='/' state={{message: 'アカウント所有者しかアクセスできません', type: 'error-message', condition: true}} />,
    },
    {
      path: "*",
      element: <Page404 />
    },
  ];
};
