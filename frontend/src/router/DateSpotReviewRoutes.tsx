import { Edit } from "../components/pages/dateSpotReviews/Edit";
import { New } from "../components/pages/dateSpotReviews/New";

export const dateSpotReviewRoutes = [
  {
    path: "new",
    element: <New />
  },
  {
    path: ":id/edit",
    element: <Edit />
  },
];