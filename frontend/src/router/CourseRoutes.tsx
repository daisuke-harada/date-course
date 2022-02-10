import { Edit } from "../components/pages/courses/Edit";
import { Index } from "../components/pages/courses/Index";
import { Show } from "../components/pages/courses/Show";

export const courseRoutes = [
  {
    path: "index",
    element: <Index />
  },
  {
    path: ":id",
    element: <Show />
  },
  {
    path: ":id/edit",
    element: <Edit />
  },
];