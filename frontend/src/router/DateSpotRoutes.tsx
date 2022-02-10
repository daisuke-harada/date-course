import { DateSpotEdit } from "../components/pages/dateSpots/DateSpotEdit";
import { DateSpotIndex } from "../components/pages/dateSpots/DateSpotIndex";
import { DateSpotNew } from "../components/pages/dateSpots/DateSpotNew";
import { DateSpotShow } from "../components/pages/dateSpots/DateSpotShow";
import { Page404 } from "../components/pages/Page404";

export const dateSpotRoutes = [
  {
    path: ":id",
    element: <DateSpotShow />
  },
  {
    path: ":id/edit",
    element: <DateSpotEdit />
  },
  {
    path: "index",
    element: <DateSpotIndex />
  },
  {
    path: "new",
    element: <DateSpotNew />
  },
  {
    path: "*",
    element: <Page404 />
  },
];