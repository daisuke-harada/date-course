import { Edit } from "../components/pages/users/Edit";
import { Index } from "../components/pages/users/Index";
import { New } from "../components/pages/users/New";
import { Show } from "../components/pages/users/Show";

export const userRoutes = [
  {
    path: ":id",
    element: <Show />
  },
  {
    path: ":id/edit",
    element: <Edit />
  },
  {
    path: "index",
    element: <Index />
  },
  {
    path: "new",
    element: <New />
  },
];