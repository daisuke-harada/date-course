import { Page404 } from "../components/pages/Page404";
import { UserEdit } from "../components/pages/users/UserEdit";
import { UserIndex } from "../components/pages/users/UserIndex";
import { UserNew } from "../components/pages/users/UserNew";
import { UserShow } from "../components/pages/users/UserShow";

export const userRoutes = [
  {
    path: ":id",
    element: <UserShow />
  },
  {
    path: ":id/edit",
    element: <UserEdit />
  },
  {
    path: "index",
    element: <UserIndex />
  },
  {
    path: "new",
    element: <UserNew />
  },
  {
    path: "*",
    element: <Page404 />
  },
];