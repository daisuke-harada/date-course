import { Edit } from "components/pages/dateSpotReviews/Edit";
import { New } from "components/pages/dateSpotReviews/New";
import { Page404 } from "components/pages/Page404";

export const DateSpotReviewRoutes = [
  {
    path: "new",
    element: <New />
  },
  {
    path: ":id/edit",
    element: <Edit />
  },
  {
    path: "*",
    element: <Page404 />
  },
];