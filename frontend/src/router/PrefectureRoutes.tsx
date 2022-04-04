import { Page404 } from "components/pages/Page404";
import { Show } from "components/pages/prefectures/Show";

export const PrefectureRoutes = () => {

  return [
    {
      // TODO:そのデートコースを登録したユーザーのみがアクセスできるように改修する必要あり
      path: ":id",
      element: <Show />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ];
};