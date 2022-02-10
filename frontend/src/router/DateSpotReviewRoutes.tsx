import { DateSpotReviewEdit } from "../components/pages/dateSpotReviews/DateSpotReviewEdit";
import { DateSpotReviewNew } from "../components/pages/dateSpotReviews/DateSpotReviewNew";
import { Page404 } from "../components/pages/Page404";

export const dateSpotReviewRoutes = [
  {
    path: "new",
    element: <DateSpotReviewNew />
  },
  {
    path: ":id/edit",
    element: <DateSpotReviewEdit />
  },
  {
    path: "*",
    element: <Page404 />
  },
];