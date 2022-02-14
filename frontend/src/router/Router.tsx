import { memo, VFC } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Top } from "../components/pages/homes/Top";
import { Page404 } from "../components/pages/Page404";
import { Login } from "../components/pages/sessions/Login";
import { courseRoutes } from "./CourseRoutes";
import { dateSpotReviewRoutes } from "./DateSpotReviewRoutes";
import { dateSpotRoutes } from "./DateSpotRoutes";
import { userRoutes } from "./UserRoutes";
export const Router: VFC = memo(() => {
  return(
    <Routes>
      <Route path="/" element={<Top/>}  />
      <Route path="/login" element={<Login />} />
      <Route path="users" >
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="courses" >
        {courseRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="dateSpots" >
        {dateSpotRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="dateSpotReviews" >
        {dateSpotReviewRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
});