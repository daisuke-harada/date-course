import { Edit } from "../components/pages/dateSpots/Edit";
import { Index } from "../components/pages/dateSpots/Index";
import { New } from "../components/pages/dateSpots/New";
import { Show } from "../components/pages/dateSpots/Show";

export const dateSpotRoutes = [
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