import { Page404 } from "components/pages/Page404";
import { Show } from "components/pages/genres/Show";

export const GenreRoutes = () => {

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