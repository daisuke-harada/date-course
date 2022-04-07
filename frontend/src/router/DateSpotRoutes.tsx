import { Edit } from "components/pages/dateSpots/Edit";
import { Index } from "components/pages/dateSpots/Index";
import { Search } from "components/pages/dateSpots/Search";
import { New } from "components/pages/dateSpots/New";
import { Show } from "components/pages/dateSpots/Show";
import { Page404 } from "components/pages/Page404";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";

export const DateSpotRoutes = () =>{
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);

  return[
    {
      path: ":id",
      element: <Show />
    },
    {
      path: ":id/edit",
      element: getLoginStatus.status === true && getCurrentUser.user.admin === true ?
      <Edit /> :
      <Navigate to='/' state={{message: '管理者しかアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: "index",
      element: <Index />
    },
    {
      path: "new",
      element: getLoginStatus.status === true && getCurrentUser.user.admin === true ?
      <New /> :
      <Navigate to='/' state={{message: '管理者しかアクセスできません', type: 'error-message', condition: true}} />
    },
    {
      path: 'Search',
      element: <Search />
    },

    {
      path: "*",
      element: <Page404 />
    },
  ];
};