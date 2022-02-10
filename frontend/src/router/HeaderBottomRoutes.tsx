import { CourseIndex } from "../components/pages/courses/CourseIndex";
import { DateSpotIndex } from "../components/pages/dateSpots/DateSpotIndex";
import { UserIndex } from "../components/pages/users/UserIndex";

export const headerBottomRoutes = [
  {
    text: "デートスポットを探す",
    path: "dateSpots/index",
    element: <DateSpotIndex />
  },
  {
    text: "デートコースを探す",
    path: "courses/index",
    element: <CourseIndex />
  },
  {
    text: "ユーザーを探す",
    path: "users/index",
    element: <UserIndex />
  },
]