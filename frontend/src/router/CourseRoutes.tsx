import { CourseEdit } from "../components/pages/courses/CourseEdit";
import { CourseIndex } from "../components/pages/courses/CourseIndex";
import { CourseShow } from "../components/pages/courses/CourseShow";
import { Page404 } from "../components/pages/Page404";

export const courseRoutes = [
  {
    path: "index",
    element: <CourseIndex />
  },
  {
    path: ":id",
    element: <CourseShow />
  },
  {
    path: ":id/edit",
    element: <CourseEdit />
  },
  {
    path: "*",
    element: <Page404 />
  },
];